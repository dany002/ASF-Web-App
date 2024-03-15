package com.example.ASF.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;
    private static final String EMAIL_REGEX = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
    private static final Pattern pattern = Pattern.compile(EMAIL_REGEX);

    @Autowired
    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public boolean sendEmail(String firstName, String lastName, String email, String messageFromUser) {
        if(!isValidEmail(email))
            return false;
        SimpleMailMessage message = new SimpleMailMessage();
        String subject = "Mesaj nou de la " + firstName + " " + lastName;
        String body = "Salut ASF,\n\n";
        body += "Ma numesc " + firstName + " " + lastName + " si am urmatorul mesaj pentru voi:\n\n";
        body += messageFromUser + "\n\n";
        body += "Adresa mea de email este: " + email;

        message.setTo("destination@example.com"); // Set the recipient email address
        message.setSubject(subject);
        message.setText(body);

        try {
            javaMailSender.send(message);
            return true; // Email sent successfully
        } catch (Exception e) {
            e.printStackTrace();
            return false; // Failed to send email
        }
    }

    public static boolean isValidEmail(String email) {
        return pattern.matcher(email).matches();
    }


}
