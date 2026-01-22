package com.example.models;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "invoice_header")
public class InvoiceHeader {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "inv_id", nullable = false)
	private Integer id;

    @Column(name = "amt", nullable = false)
    private Double amt;

    @Column(name = "customer_detail")
    private String customerDetail;

    @Column(name = "inv_date")
    private LocalDate invDate;

    @Column(name = "tax", nullable = false)
    private Double tax;

    @Column(name = "total_amt", nullable = false)
    private Double totalAmt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "model_id")
    private Model model;

    @OneToMany(mappedBy = "inv")
    private Set<InvoiceDetail> invoiceDetails = new LinkedHashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Double getAmt() {
        return amt;
    }

    public void setAmt(Double amt) {
        this.amt = amt;
    }

    public String getCustomerDetail() {
        return customerDetail;
    }

    public void setCustomerDetail(String customerDetail) {
        this.customerDetail = customerDetail;
    }

    public LocalDate getInvDate() {
        return invDate;
    }

    public void setInvDate(LocalDate invDate) {
        this.invDate = invDate;
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

    public Model getModel() {
        return model;
    }

    public void setModel(Model model) {
        this.model = model;
    }

    public Set<InvoiceDetail> getInvoiceDetails() {
        return invoiceDetails;
    }

    public void setInvoiceDetails(Set<InvoiceDetail> invoiceDetails) {
        this.invoiceDetails = invoiceDetails;
    }

}