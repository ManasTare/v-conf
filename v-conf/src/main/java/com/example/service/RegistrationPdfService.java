package com.example.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.Phrase;
import com.example.models.User;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.Element;

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

			// ===== Fonts =====
			Font titleFont = new Font(Font.FontFamily.HELVETICA, 16, Font.BOLD);
			Font headerFont = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD);
			Font normalFont = new Font(Font.FontFamily.HELVETICA, 11);

			// ===== Title =====
			Paragraph title = new Paragraph("REGISTRATION DETAILS", titleFont);
			title.setAlignment(Element.ALIGN_CENTER);
			title.setSpacingAfter(15);
			document.add(title);

			// ===== Company Info =====
			document.add(new Paragraph("Company Information", headerFont));
			document.add(new Paragraph(" ", normalFont));

			PdfPTable companyTable = new PdfPTable(2);
			companyTable.setWidthPercentage(100);
			companyTable.setSpacingAfter(15);
			companyTable.setWidths(new float[] { 3, 7 });

			addRow(companyTable, "Registration No", user.getRegistrationNo());
			addRow(companyTable, "Company Name", user.getCompanyName());
			addRow(companyTable, "Username", user.getUsername());
			addRow(companyTable, "Holding Type", user.getHoldingType());
			addRow(companyTable, "ST No", user.getCompanyStNo());
			addRow(companyTable, "VAT No", user.getCompanyVatNo());
			addRow(companyTable, "PAN", user.getTaxPan());

			document.add(companyTable);

			// ===== Authorized Person =====
			document.add(new Paragraph("Authorized Person Details", headerFont));
			document.add(new Paragraph(" ", normalFont));

			PdfPTable authTable = new PdfPTable(2);
			authTable.setWidthPercentage(100);
			authTable.setWidths(new float[] { 3, 7 });

			addRow(authTable, "Name", user.getAuthName());
			addRow(authTable, "Designation", user.getDesignation());
			addRow(authTable, "Email", user.getEmail());
			addRow(authTable, "Phone", user.getAuthTel());

			document.add(authTable);

			document.close();
			return file;

		} catch (Exception e) {
			throw new RuntimeException("PDF generation failed", e);
		}
	}

	// ===== Helper Method =====
	private void addRow(PdfPTable table, String key, String value) {
		Font keyFont = new Font(Font.FontFamily.HELVETICA, 11, Font.BOLD);
		Font valueFont = new Font(Font.FontFamily.HELVETICA, 11);

		PdfPCell cell1 = new PdfPCell(new Phrase(key, keyFont));
		PdfPCell cell2 = new PdfPCell(new Phrase((value != null) ? value : "-", valueFont));

		cell1.setBorder(Rectangle.NO_BORDER);
		cell2.setBorder(Rectangle.NO_BORDER);

		table.addCell(cell1);
		table.addCell(cell2);
	}
}