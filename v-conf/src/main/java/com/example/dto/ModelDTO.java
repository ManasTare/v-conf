package com.example.dto;

public class ModelDTO {

    private Integer id;
    private String name;
    private Double price;
    private Integer minQty;
    private String imagePath;

    public ModelDTO() {}

    public ModelDTO(Integer id, String name, Double price, Integer minQty, String imagePath) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.minQty = minQty;
        this.imagePath = imagePath;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getMinQty() {
        return minQty;
    }

    public void setMinQty(Integer minQty) {
        this.minQty = minQty;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
}
