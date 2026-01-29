package com.example.models;

import jakarta.persistence.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "component")
public class Component {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comp_id")
    private Integer compId;

    @Column(name = "comp_name")
    private String compName;   // Main component name (Seat Belt, Air Bag)

    @Column(name = "comp_type")
    private String type;  
    
    @Column(name = "price")
    private double price;  
    
    
    public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	@OneToMany(mappedBy = "comp")
    private Set<AlternateComponentMaster> alternateComponentMasters = new LinkedHashSet<>();

    @OneToMany(mappedBy = "comp")
    private Set<InvoiceDetail> invoiceDetails = new LinkedHashSet<>();

    @OneToMany(mappedBy = "comp")
    private Set<VehicleDetail> vehicleDetails = new LinkedHashSet<>();

    
    public Integer getCompId() {
		return compId;
	}

	public void setCompId(Integer compId) {
		this.compId = compId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getCompName() {
        return compName;
    }

    public void setCompName(String compName) {
        this.compName = compName;
    }

    public Set<AlternateComponentMaster> getAlternateComponentMasters() {
        return alternateComponentMasters;
    }

    public void setAlternateComponentMasters(Set<AlternateComponentMaster> alternateComponentMasters) {
        this.alternateComponentMasters = alternateComponentMasters;
    }

    public Set<InvoiceDetail> getInvoiceDetails() {
        return invoiceDetails;
    }

    public void setInvoiceDetails(Set<InvoiceDetail> invoiceDetails) {
        this.invoiceDetails = invoiceDetails;
    }

    public Set<VehicleDetail> getVehicleDetails() {
        return vehicleDetails;
    }

    public void setVehicleDetails(Set<VehicleDetail> vehicleDetails) {
        this.vehicleDetails = vehicleDetails;
    }

}