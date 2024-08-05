package com.medicine.medicine.Service;

public interface EmailService {
    void sendSimpleEmail(String to, String subject, String text);

    void storeVerificationCode(String email, String code);

    boolean verifyEmail(String email, String code);
}
