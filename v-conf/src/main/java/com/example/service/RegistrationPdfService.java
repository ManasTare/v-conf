package com.example.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.itextpdf.text.pdf.PdfWriter;
import com.example.models.User;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;

@Service
public class RegistrationPdfService {

	@Value("${file.path}")
	private String path;

	public File generateRegistrationPdf(User user) {

		String fileName = "registration_" + user.getRegistrationNo() + ".pdf";
		File directory = new File(path);
		if (!directory.exists()) {
		    directory.mkdirs();
		}

		File file = new File(directory, fileName);

		Document document = new Document();
		try {
			PdfWriter.getInstance(document, new FileOutputStream(file));
			document.open();

			document.add(new Paragraph("REGISTRATION DETAILS"));
			document.add(new Paragraph("--------------------------------"));

			document.add(new Paragraph("Registration No: " + user.getRegistrationNo()));
			document.add(new Paragraph("Company Name: " + user.getCompanyName()));
			document.add(new Paragraph("Username: " + user.getUsername()));
			document.add(new Paragraph("Holding Type: " + user.getHoldingType()));
			document.add(new Paragraph("ST No: " + user.getCompanyStNo()));
			document.add(new Paragraph("VAT No: " + user.getCompanyVatNo()));
			document.add(new Paragraph("PAN: " + user.getTaxPan()));

			document.add(new Paragraph("\nAuthorized Person:"));
			document.add(new Paragraph("Name: " + user.getAuthName()));
			document.add(new Paragraph("Designation: " + user.getDesignation()));
			document.add(new Paragraph("Email: " + user.getEmail()));
			document.add(new Paragraph("Phone: " + user.getAuthTel()));

			document.close();

			return file;

		} catch (FileNotFoundException | DocumentException e) {

			throw new RuntimeException("PDF generation failed", e);
		}

	}

}
