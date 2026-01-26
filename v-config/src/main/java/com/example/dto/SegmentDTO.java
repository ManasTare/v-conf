package com.example.dto;

public class SegmentDTO {

    private Integer id;
    private String name;
    private Integer minQty;

    public SegmentDTO() {}

    public SegmentDTO(Integer id, String name, Integer minQty) {
        this.id = id;
        this.name = name;
        this.minQty = minQty;
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

    public Integer getMinQty() {
        return minQty;
    }

    public void setMinQty(Integer minQty) {
        this.minQty = minQty;
    }
}
