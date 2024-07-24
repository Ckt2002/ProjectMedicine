package com.medicine.medicine.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "account")
public class Account {
    @Id
    @Column(name = "id", length = 10)
    private String id;

    @Column(name = "username", unique = true, nullable = false, length = 100)
    private String username;

    @Column(name = "email", unique = true, nullable = false, length = 200)
    private String email;

    @Column(name = "password", nullable = false, length = 50)
    private String password;

    @Column(name = "first_name", nullable = false, length = 100)
    private String first_name;

    @Column(name = "last_name", nullable = false, length = 100)
    private String last_name;

    @Column(name = "phone_number", unique = true, nullable = false, length = 15)
    private String phone_number;

    @Column(name = "address", nullable = false, length = 200)
    private String address;

    @Column(name = "role", nullable = false, length = 10)
    private String role;

    @Column(name = "status", nullable = false, length = 10)
    private String status;
}
