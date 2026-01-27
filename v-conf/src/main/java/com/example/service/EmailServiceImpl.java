package com.example.service;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.aop.EmailAudit;
import com.example.models.User;

@Service
public class EmailServiceImpl implements EmailService {

	@Autowired
	private EmailSender mailSender;

	@Autowired
	private RegistrationPdfService pdfService;

	@EmailAudit("REGISTRATION_EMAIL")
	@Override
	public void sendRegistrationEmail(User user) {

		String subject = "Registration Successful";

		String message = "Hello " + user.getAuthName() + ",\n\n" + "Your registration is successful.\n\n"
				+ "Registration No: " + user.getRegistrationNo() + "\n" + "Company: " + user.getCompanyName() + "\n\n"
				+ "Regards,\nVehicle Configurator Team";

		File registrationPdf = pdfService.generateRegistrationPdf(user);

		mailSender.send(user.getEmail(), subject, registrationPdf, message);

	}

}
