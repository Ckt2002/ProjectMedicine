package com.medicine.medicine.Service;

import com.medicine.medicine.Entity.Account;

import java.util.List;

public interface AccountService {

    public List<Account> getAllAccounts();

    public Account getAccountById(String id);

    public String updateAccount(Account account);

    public String addAccount(Account account);

    public Account login(String username, String password);

    public Account loginAdmin(String username, String password);

    Account getAccountByEmail(String email);
}
