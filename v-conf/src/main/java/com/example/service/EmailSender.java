package com.example.service;

import java.io.File;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import jakarta.activation.DataHandler;
import jakarta.activation.DataSource;
import jakarta.activation.FileDataSource;
import jakarta.mail.BodyPart;
import jakarta.mail.Message;
import jakarta.mail.Multipart;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeBodyPart;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMultipart;

@Component
public class EmailSender {
	@Value("${file.path}")
	private String path;

	@Value("${mail.username}")
	private String username;

	@Value("${mail.password}")
	private String password;

	public void send(String toEmail, String subject, File attachment, String messageText) {

//		final String username = "tsamruddhi16@gmail.com";
//		final String password = "hqixsjpptyvizhae";

		Properties props = new Properties();
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtp.port", "587");

		Session session = Session.getInstance(props, new jakarta.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, password);
			}
		});

		try {
			MimeMessage message = new MimeMessage(session);
			message.setFrom(new InternetAddress(username));
			message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
			message.setSubject(subject);

			Multipart multipart = new MimeMultipart();

			// TEXT PART (ALWAYS REQUIRED)
			MimeBodyPart textPart = new MimeBodyPart();
			textPart.setText(messageText);
			multipart.addBodyPart(textPart);

			// ATTACHMENT PART (ONLY IF FILE EXISTS)
			if (attachment != null && attachment.exists()) {

				MimeBodyPart filePart = new MimeBodyPart();

				DataSource source = new FileDataSource(attachment);
				filePart.setDataHandler(new DataHandler(source));
				filePart.setFileName(attachment.getName());

				multipart.addBodyPart(filePart);

			}

			message.setContent(multipart);
			Transport.send(message);

			System.out.println(" Email sent successfully to " + toEmail);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
