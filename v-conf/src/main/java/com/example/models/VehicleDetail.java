package com.example.models;

import jakarta.persistence.*;

@Entity
@Table(name = "vehicle_detail")
public class VehicleDetail {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "config_id")
	    private Integer configId;

	    @Column(name = "comp_type")
	    private String compType;   // S / I / E / C

	    @Column(name = "is_config")
	    private String isConfig;   // Y / N

	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "comp_id")
	    private Component comp;    // Default subtype

	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "model_id")
	    private Model model;


    public Integer getConfigId() {
			return configId;
		}
		public void setConfigId(Integer configId) {
			this.configId = configId;
		}
		public String getCompType() {
			return compType;
		}
		public void setCompType(String compType) {
			this.compType = compType;
		}
	public Component getComp() { return comp; }
    public void setComp(Component comp) { this.comp = comp; }

    public Model getModel() { return model; }
    public void setModel(Model model) { this.model = model; }

    public String getIsConfig() { return isConfig; }
    public void setIsConfig(String isConfig) { this.isConfig = isConfig; }
}
