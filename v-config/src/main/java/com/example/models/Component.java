package com.example.models;

import jakarta.persistence.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "component")
public class Component {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comp_id", nullable = false)
    private Integer id;

    @Column(name = "comp_name")
    private String compName;

    @OneToMany(mappedBy = "comp")
    private Set<AlternateComponentMaster> alternateComponentMasters = new LinkedHashSet<>();

    @OneToMany(mappedBy = "comp")
    private Set<InvoiceDetail> invoiceDetails = new LinkedHashSet<>();

    @OneToMany(mappedBy = "comp")
    private Set<VehicleDetail> vehicleDetails = new LinkedHashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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