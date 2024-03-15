package com.example.ASF.Controller;


import com.example.ASF.DTO.Email;
import com.example.ASF.Service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sendEmail")
public class EmailController {

    private final EmailService emailService;

    @Autowired
    public EmailController(EmailService emailService){
        this.emailService = emailService;
    }

    @PostMapping
    public ResponseEntity.BodyBuilder sendEmail(@RequestBody Email email){
        boolean result = this.emailService.sendEmail(email.getFirstName(), email.getLastName(), email.getEmail(), email.getMessage());
        if(result)
            return ResponseEntity.ok();
        else
            return ResponseEntity.status(405);
    }
}
