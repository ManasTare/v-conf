package com.example.dto;

import java.util.List;

public class DefaultConfigResponseDTO {

    private Integer modelId;
    private String modelName;
    private String segmentName;
    private String manufacturerName;

    private Double basePrice;
    private Integer minQuantity;
    private Double totalPrice;

    private List<ComponentDTO> defaultComponents;

    public DefaultConfigResponseDTO(
            Integer modelId,
            String modelName,
            String segmentName,
            String manufacturerName,
            Double basePrice,
            Integer minQuantity,
            Double totalPrice,
            List<ComponentDTO> defaultComponents
    ) {
        this.modelId = modelId;
        this.modelName = modelName;
        this.segmentName = segmentName;
        this.manufacturerName = manufacturerName;
        this.basePrice = basePrice;
        this.minQuantity = minQuantity;
        this.totalPrice = totalPrice;
        this.defaultComponents = defaultComponents;
    }

    public Integer getModelId() { return modelId; }
    public String getModelName() { return modelName; }
    public String getSegmentName() { return segmentName; }
    public String getManufacturerName() { return manufacturerName; }
    public Double getBasePrice() { return basePrice; }
    public Integer getMinQuantity() { return minQuantity; }
    public Double getTotalPrice() { return totalPrice; }
    public List<ComponentDTO> getDefaultComponents() { return defaultComponents; }
}
