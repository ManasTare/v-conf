package com.example.models;

import jakarta.persistence.*;

@Entity
@Table(name = "sg_mfg_master")
public class SgMfgMaster {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sgmf_id")   // ✅ MATCH DB COLUMN
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mfg_id", nullable = false)
    private Manufacturer mfg;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seg_id", nullable = false)
    private Segment seg;

    public Segment getSeg() { return seg; }
    public Manufacturer getMfg() { return mfg; }
}
