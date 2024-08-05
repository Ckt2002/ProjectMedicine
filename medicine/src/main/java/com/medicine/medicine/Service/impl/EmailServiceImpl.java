package com.medicine.medicine.Service.impl;

import com.medicine.medicine.Service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class EmailServiceImpl implements EmailService {
    private Map<String, String> verificationMap = new ConcurrentHashMap<>();

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendSimpleEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }

    @Override
    public void storeVerificationCode(String email, String code) {
        verificationMap.put(email, code);
    }

    @Override
    public boolean verifyEmail(String email, String code) {
        String storedCode = verificationMap.get(email);
        if (storedCode != null && storedCode.equals(code)) {
            verificationMap.remove(email);
            return true;
        }
        return false;
    }
}
