package com.example.service;

import com.example.models.InvoiceDetail;
import com.example.models.InvoiceHeader;
import com.example.models.User;

import java.util.List;

public interface EmailService {
    void sendRegistrationEmail(User user);
    void sendInvoiceEmail(String toEmail, InvoiceHeader invoice, List<InvoiceDetail> details);

}
