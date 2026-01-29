package com.example.models;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "invoice_header")
public class InvoiceHeader {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inv_id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "model_id", nullable = false)
    private Model model;

    @Column(name = "qty", nullable = false)
    private Integer qty;

    @Column(name = "base_amt", nullable = false)
    private Double baseAmt;

    @Column(name = "tax", nullable = false)
    private Double tax;

    @Column(name = "total_amt", nullable = false)
    private Double totalAmt;

//    @Column(name = "amt", nullable = false)
//    private Double amt;

    @Column(name = "inv_date")
    private LocalDate invDate;

    public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Model getModel() {
		return model;
	}

	public void setModel(Model model) {
		this.model = model;
	}

	public Integer getQty() {
		return qty;
	}

	public void setQty(Integer qty) {
		this.qty = qty;
	}

	public Double getBaseAmt() {
		return baseAmt;
	}

	public void setBaseAmt(Double baseAmt) {
		this.baseAmt = baseAmt;
	}

	public Double getTax() {
		return tax;
	}

	public void setTax(Double tax) {
		this.tax = tax;
	}

	public Double getTotalAmt() {
		return totalAmt;
	}

	public void setTotalAmt(Double totalAmt) {
		this.totalAmt = totalAmt;
	}

	public LocalDate getInvDate() {
		return invDate;
	}

	public void setInvDate(LocalDate invDate) {
		this.invDate = invDate;
	}

	public InvoiceStatus getStatus() {
		return status;
	}

	public void setStatus(InvoiceStatus status) {
		this.status = status;
	}

	public String getCustomerDetail() {
		return customerDetail;
	}

	public void setCustomerDetail(String customerDetail) {
		this.customerDetail = customerDetail;
	}

	@Enumerated(EnumType.STRING)
    @Column(name = "status")
    private InvoiceStatus status;

    @Column(name = "customer_detail")
    private String customerDetail;
}
