package com.example.dto;

import java.util.List;

public class AlternateComponentSaveDTO {

	private Integer modelId;
    private List<AlternateComponentDTO> components;

    public Integer getModelId() {
        return modelId;
    }

    public void setModelId(Integer modelId) {
        this.modelId = modelId;
    }

    public List<AlternateComponentDTO> getComponents() {
        return components;
    }

    public void setComponents(List<AlternateComponentDTO> components) {
        this.components = components;
    }
}
