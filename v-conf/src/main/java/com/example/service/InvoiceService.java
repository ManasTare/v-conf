package com.example.service;

import com.example.models.InvoiceHeader;

import com.example.repository.InvoiceHeaderRepository;

import org.springframework.stereotype.Service;

@Service
public class InvoiceService {

    private final InvoiceHeaderRepository invoiceRepo;

    
    public InvoiceService(InvoiceHeaderRepository invoiceRepo) // Constructor Injection (BEST PRACTICE)
    {
        this.invoiceRepo = invoiceRepo;
    }


    
    public InvoiceHeader saveInvoice(InvoiceHeader invoice)  // save invoice
    {

    	// do calculations here
    	
    	
    	
        return invoiceRepo.save(invoice);
    }

   
    public InvoiceHeader getInvoice(Integer id)  // get by id
    {
        return invoiceRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found with id: " + id));
    }
}
