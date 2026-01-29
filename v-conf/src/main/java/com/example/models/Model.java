package com.example.models;

import jakarta.persistence.*;

@Entity
@Table(name = "model")
public class Model {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "model_id")
    private Integer id;

    @Column(name = "img_path")
    private String imgPath;

    @Column(name = "min_qty", nullable = false)
    private Integer minQty;

    @Column(name = "model_name")
    private String modelName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mfg_id")
    private Manufacturer mfg;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seg_id")
    private Segment seg;

    @Column(name = "price", nullable = false)
    private Double price;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getImgPath() {
        return imgPath;
    }

    public void setImgPath(String imgPath) {
        this.imgPath = imgPath;
    }

    public Integer getMinQty() {
        return minQty;
    }

    public void setMinQty(Integer minQty) {
        this.minQty = minQty;
    }

    public String getModelName() {
        return modelName;
    }

    public void setModelName(String modelName) {
        this.modelName = modelName;
    }

    public Manufacturer getMfg() {
        return mfg;
    }

    public void setMfg(Manufacturer mfg) {
        this.mfg = mfg;
    }

    public Segment getSeg() {
        return seg;
    }

    public void setSeg(Segment seg) {
        this.seg = seg;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}

