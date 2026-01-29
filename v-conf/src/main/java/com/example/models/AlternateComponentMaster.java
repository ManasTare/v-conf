package com.example.models;

import jakarta.persistence.*;

@Entity
@Table(name = "alternate_component_master")
public class AlternateComponentMaster {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alt_id")
    private Integer id;

    @Column(name = "delta_price")
    private Double deltaPrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "alt_comp_id")
    private Component altComp;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comp_id")
    private Component comp;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "model_id")
    private Model model;
    
   
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Double getDeltaPrice() {
        return deltaPrice;
    }

    public void setDeltaPrice(Double deltaPrice) {
        this.deltaPrice = deltaPrice;
    }

    public Component getAltComp() {
        return altComp;
    }

    public void setAltComp(Component altComp) {
        this.altComp = altComp;
    }

    public Component getComp() {
        return comp;
    }

    public void setComp(Component comp) {
        this.comp = comp;
    }

    public Model getModel() {
        return model;
    }

    public void setModel(Model model) {
        this.model = model;
    }

}