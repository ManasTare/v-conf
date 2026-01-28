package com.example.service;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.aop.EmailAudit;
import com.example.models.InvoiceDetail;
import com.example.models.InvoiceHeader;
import com.example.models.User;

@Service
public class EmailServiceImpl implements EmailService {

	@Autowired
	private EmailSender mailSender;

	@Value("${file.path}")
	private String path;

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

	@EmailAudit("INVOICE_EMAIL")
	@Override
	public void sendInvoiceEmail(String toEmail, InvoiceHeader invoice, List<InvoiceDetail> details) {

		try {
			String filePath = path + File.separator + "invoice_" + invoice.getId() + ".pdf";
			File pdf = new File(filePath);

			// Check if file exists, if not, generate it (fallback)
			if (!pdf.exists()) {
				InvoicePDFExporter exporter = new InvoicePDFExporter(invoice, details);
				pdf = exporter.exportToFile(filePath);
			}

			String subject = "Invoice Generated - " + invoice.getId();
			String message = "Dear Customer,\n\n" + "Please find your invoice attached.\n\n"
					+ "Regards,\nVehicle Configurator Team";

			mailSender.send(toEmail, subject, pdf, message);

		} catch (Exception e) {
			throw new RuntimeException("Invoice email failed", e);
		}
	}

}