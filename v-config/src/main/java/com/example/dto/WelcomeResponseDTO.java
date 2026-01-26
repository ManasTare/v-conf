package com.example.dto;

import java.util.List;

public class WelcomeResponseDTO {

    private List<SegmentDTO> segments;
    private List<ManufacturerDTO> manufacturers;
    private List<ModelDTO> models;

    public WelcomeResponseDTO() {}

    public WelcomeResponseDTO(List<SegmentDTO> segments,
                              List<ManufacturerDTO> manufacturers,
                              List<ModelDTO> models) {
        this.segments = segments;
        this.manufacturers = manufacturers;
        this.models = models;
    }

    public List<SegmentDTO> getSegments() {
        return segments;
    }

    public void setSegments(List<SegmentDTO> segments) {
        this.segments = segments;
    }

    public List<ManufacturerDTO> getManufacturers() {
        return manufacturers;
    }

    public void setManufacturers(List<ManufacturerDTO> manufacturers) {
        this.manufacturers = manufacturers;
    }

    public List<ModelDTO> getModels() {
        return models;
    }

    public void setModels(List<ModelDTO> models) {
        this.models = models;
    }
}
