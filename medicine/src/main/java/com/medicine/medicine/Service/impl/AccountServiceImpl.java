package com.medicine.medicine.Service.impl;

import com.medicine.medicine.Entity.Account;
import com.medicine.medicine.Repository.AccountRepository;
import com.medicine.medicine.Service.AccountService;
import com.medicine.medicine.UtilityClass.RandomIdGenerator;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

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
            if (account.getPassword().equals(password)) {
                return account;
            }
        }
        throw new IllegalArgumentException("Invalid username or password");
    }

    @Override
    public Account loginAdmin(String username, String password) {
        Optional<Account> accountOpt = accountRepository.findByUsername(username);
        if (accountOpt.isPresent()) {
            Account account = accountOpt.get();
            if (account.getPassword().equals(password) && account.getRole().equals("admin")) {
                return account;
            }
        }
        throw new IllegalArgumentException("Invalid username or password");
    }

}
