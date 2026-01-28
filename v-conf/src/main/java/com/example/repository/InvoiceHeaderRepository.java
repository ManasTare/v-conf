package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.models.InvoiceHeader;

public interface InvoiceHeaderRepository extends JpaRepository<InvoiceHeader, Integer>{
	

}
