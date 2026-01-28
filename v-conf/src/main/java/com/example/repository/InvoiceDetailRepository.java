package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.models.InvoiceDetail;

public interface InvoiceDetailRepository extends JpaRepository<InvoiceDetail,Integer>{

}
