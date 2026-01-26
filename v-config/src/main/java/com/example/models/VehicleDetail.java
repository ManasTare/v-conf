package com.example.models;

import jakarta.persistence.*;

@Entity
@Table(name = "vehicle_detail")
public class VehicleDetail {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "config_id")
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name = "comp_type")
    private CompType compType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comp_id")
    private Component comp;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "model_id")
    private Model model;

    @Column(name = "is_config")
    private String isConfig;


    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public CompType getCompType() { return compType; }
    public void setCompType(CompType compType) { this.compType = compType; }

    public Component getComp() { return comp; }
    public void setComp(Component comp) { this.comp = comp; }

    public Model getModel() { return model; }
    public void setModel(Model model) { this.model = model; }

    public String getIsConfig() { return isConfig; }
    public void setIsConfig(String isConfig) { this.isConfig = isConfig; }
}
