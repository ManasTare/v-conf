package com.example.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.models.User;

@Service
public class EmailServiceImpl implements EmailService {

	@Autowired
	private EmailSender mailSender;
	
	@Override
	public void sendRegistrationEmail(User user) {
		
		 String subject = "Registration Successful";

        String message =
            "Hello " + user.getAuthName() + ",\n\n" +
            "Your registration is successful.\n\n" +
            "Registration No: " + user.getRegistrationNo() + "\n" +
            "Company: " + user.getCompanyName() + "\n\n" +
            "Regards,\nVehicle Configurator Team";
        
        mailSender.send(
                user.getEmail(),   // dynamic user email
                subject,
                null,              // no attachment
                message
            );
		
	}

	

}
