package com.medicine.medicine.Service.impl;

import com.medicine.medicine.Entity.Account;
import com.medicine.medicine.Entity.CustomUserDetails;
import com.medicine.medicine.Repository.AccountRepository;
import com.medicine.medicine.Service.AccountService;
import com.medicine.medicine.UtilityClass.RandomIdGenerator;
import com.sun.tools.jconsole.JConsoleContext;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AccountServiceImpl implements AccountService, UserDetailsService {

    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<Account> getAllAccounts()
    {
        return accountRepository.findAll();
    }

    @Override
    public Account getAccountById(String id)
    {
        Optional<Account> account = accountRepository.findById(id);
        return account.orElse(null);
    }

    @Override
    public String updateAccount(Account accountToUpdate)
    {
        Optional<Account> result = accountRepository.findById(accountToUpdate.getId());
        Account account = result.orElse(null);
        if (account != null){

            // Kiểm tra xem mật khẩu có được thay đổi không
            if (!passwordEncoder.matches(accountToUpdate.getPassword(), account.getPassword())) {
                // Nếu có, mã hóa mật khẩu mới trước khi cập nhật
                String encodedPassword = passwordEncoder.encode(accountToUpdate.getPassword());
                accountToUpdate.setPassword(encodedPassword);
            } else {
                // Nếu mật khẩu không thay đổi, giữ nguyên mật khẩu cũ
                accountToUpdate.setPassword(account.getPassword());
            }

            accountRepository.save(accountToUpdate);
            return "Update successful";
        }
        throw new IllegalArgumentException("Update failed");
    }

    @Override
    public String addAccount(Account account)
    {
        if (accountRepository.findByUsername(account.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }

        if (accountRepository.findByEmail(account.getEmail()).isPresent()){
            throw new IllegalArgumentException("Email already exists");
        }
        String encodedPassword = passwordEncoder.encode(account.getPassword());

        account.setPassword(encodedPassword);
        account.setId(RandomIdGenerator.generateRandomId());
        account.setStatus("active");
        account.setRole("user");

        accountRepository.save(account);

        return "Add successful";
    }

    @Override
    public Account login(String username, String password) throws IllegalArgumentException {
        Optional<Account> accountOpt = accountRepository.findByUsername(username);
        if (accountOpt.isPresent()) {
            Account account = accountOpt.get();
            if (passwordEncoder.matches(password, account.getPassword())
                    && account.getRole().equals("user")
                    && account.getStatus().equals("active")) {
                return account;
            } else if (!account.getStatus().equals("active")) {
                throw new IllegalArgumentException("Your account is inactive");
            }
        }
        throw new IllegalArgumentException("Invalid username or password");
    }

    @Override
    public Account loginAdmin(String username, String password) {
        Optional<Account> accountOpt = accountRepository.findByUsername(username);
        if (accountOpt.isPresent()) {
            Account account = accountOpt.get();
            if (passwordEncoder.matches(password, account.getPassword())
                    && account.getRole().equals("admin")
                    && account.getStatus().equals("active")) {
                return account;
            } else if (!account.getStatus().equals("active")) {
                throw new IllegalArgumentException("You can't login with this account");
            }
        }
        throw new IllegalArgumentException("Invalid username or password");
    }

    @Override
    public Account getAccountByEmail(String email) {
        Optional<Account> accountTemp = accountRepository.findByEmail(email);
        if (accountTemp.isPresent()) {
            return accountTemp.get();
        }
        throw new IllegalArgumentException("Email not found");
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Account> accountOpt = accountRepository.findByUsername(username);
        if (accountOpt.isPresent()) {
            return new CustomUserDetails(accountOpt.get());
        }
        throw new UsernameNotFoundException("User not found with username: " + username);
    }

    @Override
    public boolean verifyCurrentPassword(String accountId, String currentPassword) {
        Optional<Account> accountOpt = accountRepository.findById(accountId);
        if (accountOpt.isPresent()) {
            Account account = accountOpt.get();
            System.out.println(passwordEncoder.matches(currentPassword, account.getPassword()));
            return passwordEncoder.matches(currentPassword, account.getPassword());
        }
        return false;
    }
}
