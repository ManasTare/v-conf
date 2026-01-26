package com.example.repository;

import com.example.models.InvoiceHeader;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceHeaderRepository
extends JpaRepository<InvoiceHeader, Integer> {
}