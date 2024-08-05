package com.medicine.medicine.Controller;

import com.medicine.medicine.Entity.Account;
import com.medicine.medicine.Security.JwtTokenUtil;
import com.medicine.medicine.Service.AccountService;
import com.medicine.medicine.Service.EmailService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/account")
public class AccountController {
    private AuthenticationManager authenticationManager;

    private JwtTokenUtil jwtTokenUtil;

    private AccountService accountService;

    private EmailService emailService;

    @GetMapping
    public ResponseEntity<List<Account>> getAllAccounts(){
        List<Account> list = accountService.getAllAccounts();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Account> getAccountById(@PathVariable("id") String id){
        Account result = accountService.getAccountById(id);
        if (result != null)
            return new ResponseEntity<>(result, HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addAccount(@RequestBody Account account) {
        try {
            String result = accountService.addAccount(account);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/updatePassword")
    public ResponseEntity<Account> updateAccountPassword(@RequestBody Account accountToUpdate){
        try {
            String result = accountService.updateAccount(accountToUpdate);
            return new ResponseEntity<>(accountToUpdate, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping
    public ResponseEntity<Account> updateAccount(@RequestBody Account accountToUpdate){
        try {
            String result = accountService.updateAccount(accountToUpdate);
            return new ResponseEntity<>(accountToUpdate, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/login/{username}/{password}")
    public ResponseEntity<Map<String, String>> login(@PathVariable("username") String username,
                                        @PathVariable("password") String password,
                                        HttpServletRequest request) {
        try {
            Account account = accountService.login(username, password);
            String token = jwtTokenUtil.generateToken(username);
            HttpSession session = request.getSession();
            session.setAttribute("userId", account.getId());

            Map<String, String> response = new HashMap<>();
            response.put("accountId", account.getId());
            response.put("token", token);

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(Collections.singletonMap("error", e.getMessage()), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/login_admin/{username}/{password}")
    public ResponseEntity<Map<String, String>> loginAdmin(@PathVariable("username") String username,
                                                     @PathVariable("password") String password,
                                                     HttpServletRequest request) {
        try {
            Account account = accountService.loginAdmin(username, password);
            String token = jwtTokenUtil.generateToken(username);
            HttpSession session = request.getSession();
            session.setAttribute("userId", account.getId());

            Map<String, String> response = new HashMap<>();
            response.put("accountId", account.getId());
            response.put("token", token);

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(Collections.singletonMap("error", e.getMessage()), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false); // Lấy session hiện tại, nếu không có thì trả về null
        if (session != null) {
            session.invalidate(); // Xoá session
        }
//        System.out.println("Logged out successfully");
        return ResponseEntity.ok("Logged out successfully");
    }

    @GetMapping("/send-email/{email}")
    public ResponseEntity<String> sendEmail(@PathVariable String email) {
        String confirmationCode = UUID.randomUUID().toString();
        emailService.sendSimpleEmail(email, "Email Confirmation",
                "Please copy following code and paste to form to verify your email: " + confirmationCode);
        emailService.storeVerificationCode(email, confirmationCode);
//        System.out.println(confirmationCode);
        return ResponseEntity.ok("Email sent successfully");
    }

    @GetMapping("/confirm-email/{email}/{code}")
    public ResponseEntity<String> confirmEmail(@PathVariable String email,@PathVariable String code) {
        if (emailService.verifyEmail(email, code)) {
            return ResponseEntity.ok("Email confirmed successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid confirmation code");
        }
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Account> getAccountByEmail(@PathVariable("email") String email) {
        Account account = accountService.getAccountByEmail(email);
        if (account != null) {
            return new ResponseEntity<>(account, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
}
