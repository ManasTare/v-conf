package com.example.models;

import jakarta.persistence.*;

@Entity
@Table(name = "invoice_detail")
public class InvoiceDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inv_dtl_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comp_id")
    private Component comp;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "inv_id")
    private InvoiceHeader inv;
    

    @Column(name = "comp_price", nullable = false)
    private Double compPrice;

    public Double getCompPrice() {
		return compPrice;
	}

	public void setCompPrice(Double compPrice) {
		this.compPrice = compPrice;
	}

	public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Component getComp() {
        return comp;
    }

    public void setComp(Component comp) {
        this.comp = comp;
    }

    public InvoiceHeader getInv() {
        return inv;
    }

    public void setInv(InvoiceHeader inv) {
        this.inv = inv;
    }

}