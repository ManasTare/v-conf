package com.example.dto;

import java.util.List;

public class DefaultConfigDTO {

    private Integer modelId;
    private String modelName;
    private String segmentName;
    private String manufacturerName;

    private Double basePrice;
    private Integer minQuantity;

    private List<ComponentDTO> defaultComponents;

    private Double totalPrice;

    public DefaultConfigDTO() {
    }

    public DefaultConfigDTO(Integer modelId,
                            String modelName,
                            String segmentName,
                            String manufacturerName,
                            Double basePrice,
                            Integer minQuantity,
                            List<ComponentDTO> defaultComponents,
                            Double totalPrice) {
        this.modelId = modelId;
        this.modelName = modelName;
        this.segmentName = segmentName;
        this.manufacturerName = manufacturerName;
        this.basePrice = basePrice;
        this.minQuantity = minQuantity;
        this.defaultComponents = defaultComponents;
        this.totalPrice = totalPrice;
    }

    public Integer getModelId() {
        return modelId;
    }

    public void setModelId(Integer modelId) {
        this.modelId = modelId;
    }

    public String getModelName() {
        return modelName;
    }

    public void setModelName(String modelName) {
        this.modelName = modelName;
    }

    public String getSegmentName() {
        return segmentName;
    }

    public void setSegmentName(String segmentName) {
        this.segmentName = segmentName;
    }

    public String getManufacturerName() {
        return manufacturerName;
    }

    public void setManufacturerName(String manufacturerName) {
        this.manufacturerName = manufacturerName;
    }

    public Double getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(Double basePrice) {
        this.basePrice = basePrice;
    }

    public Integer getMinQuantity() {
        return minQuantity;
    }

    public void setMinQuantity(Integer minQuantity) {
        this.minQuantity = minQuantity;
    }

    public List<ComponentDTO> getDefaultComponents() {
        return defaultComponents;
    }

    public void setDefaultComponents(List<ComponentDTO> defaultComponents) {
        this.defaultComponents = defaultComponents;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }
}
