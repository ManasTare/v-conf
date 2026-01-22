package com.example.controller;

import org.springframework.web.bind.annotation.*;

import com.example.models.InvoiceHeader;
import com.example.service.InvoiceService;

@RestController
@RequestMapping("/api/invoice")
public class InvoiceController {

	private final InvoiceService invoiceservice;
	
	public InvoiceController(InvoiceService invoiceService) // construction injection
	{
		this.invoiceservice=invoiceService;
		
		
	}
	
	@PostMapping // creates invoice
	public InvoiceHeader createINvoice(@RequestBody InvoiceHeader invoice)
	{
		return invoiceservice.saveInvoice(invoice);
	}
	
	@GetMapping("/{id}")
	public InvoiceHeader getInvoice(@PathVariable Integer id)
	{
		return invoiceservice.getInvoice(id);
	}
}
