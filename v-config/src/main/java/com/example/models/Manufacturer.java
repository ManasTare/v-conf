package com.example.models;

import jakarta.persistence.*;

@Entity
@Table(name = "manufacturer")
public class Manufacturer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mfg_id")
    private Integer id;

    @Column(name = "mfg_name")
    private String mfgName;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMfgName() {
        return mfgName;
    }

    public void setMfgName(String mfgName) {
        this.mfgName = mfgName;
    }
}
