package com.example.service;

import java.awt.Color;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

import jakarta.servlet.http.HttpServletResponse;

import com.example.models.InvoiceDetail;
import com.example.models.InvoiceHeader;
import com.lowagie.text.*;
import com.lowagie.text.pdf.*;
import com.lowagie.text.pdf.draw.LineSeparator;

public class InvoicePDFExporter {

    private InvoiceHeader invoice;
    private List<InvoiceDetail> details;

    public InvoicePDFExporter(InvoiceHeader invoice, List<InvoiceDetail> details) {
        this.invoice = invoice;
        this.details = details;
    }

    private void writeTableHeader(PdfPTable table) {

        PdfPCell cell = new PdfPCell();
        cell.setPadding(5);
        cell.setBackgroundColor(Color.BLUE);

        Font font = FontFactory.getFont(FontFactory.HELVETICA);
        font.setColor(Color.WHITE);

        cell.setPhrase(new Phrase("Component ID", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Price", font));
        table.addCell(cell);
    }

    private void writeTableData(PdfPTable table) {

        for (InvoiceDetail d : details) {
            table.addCell(String.valueOf(d.getComp().getType()));
            table.addCell(String.valueOf(d.getCompPrice()));
        }
    }

    // =======================
    // EXISTING METHOD (DOWNLOAD)
    // =======================
    public void export(HttpServletResponse response)
            throws DocumentException, IOException {

        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, response.getOutputStream());
        document.open();

        writeDocumentContent(document);

        document.close();
    }

    // =======================
    // 🔥 NEW METHOD (EMAIL FILE)
    // =======================
    public File exportToFile(String filePath)
            throws DocumentException, IOException {

        File file = new File(filePath);

        // ✅ ADD THIS BLOCK
        File parentDir = file.getParentFile();
        if (parentDir != null && !parentDir.exists()) {
            parentDir.mkdirs();
        }

        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, new FileOutputStream(file));
        document.open();

        writeDocumentContent(document);

        document.close();
        return file;
    }

    // =======================
    // COMMON PDF CONTENT
    // =======================
    private void writeDocumentContent(Document document)
            throws DocumentException {

        // -------- TITLE --------
        Font titleFont =
                FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20, Color.BLUE);
        Paragraph title =
                new Paragraph("Vehicle Configurator Invoice", titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        title.setSpacingAfter(15);
        document.add(title);

        // -------- HEADER --------
        Font headerFont =
                FontFactory.getFont(FontFactory.HELVETICA, 12, Color.BLACK);

        Paragraph header = new Paragraph();
        header.setFont(headerFont);
        header.setSpacingAfter(10);

        header.add("Invoice ID    : " + invoice.getId() + "\n");
        header.add("Customer details   : " + invoice.getCustomerDetail() + "\n");
        header.add("Model ID      : " + invoice.getModel().getModelName() + "\n");
        header.add("Quantity      : " + invoice.getQty() + "\n");
        header.add("Invoice Date  : " + invoice.getInvDate() + "\n");
        header.add("Status        : " + invoice.getStatus() + "\n");

        document.add(header);

        LineSeparator separator = new LineSeparator();
        separator.setLineColor(Color.GRAY);
        document.add(new Chunk(separator));
        document.add(Chunk.NEWLINE);

        // -------- TABLE --------
        PdfPTable table = new PdfPTable(2);
        table.setWidthPercentage(100f);
        table.setSpacingBefore(10);
        table.setWidths(new float[]{5f, 3f});

        writeTableHeader(table);
        writeTableData(table);

        document.add(table);
        document.add(Chunk.NEWLINE);

        // -------- SUMMARY --------
        Font summaryFont =
                FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);

        Paragraph summary = new Paragraph();
        summary.setFont(summaryFont);

        summary.add("Base Amount  : " + invoice.getBaseAmt() + "\n");
        summary.add("Tax          : " + invoice.getTax() + "\n");
        summary.add("Total Amount : " + invoice.getTotalAmt() + "\n");

        document.add(summary);
    }
}