package com.example.dto;

import java.util.List;

public class ComponentDropdownDto {

    private String componentName;      
    public ComponentDropdownDto(String componentName, List<OptionDto> options) {
		super();
		this.componentName = componentName;
		this.options = options;
	}
	private List<OptionDto> options;
	public String getComponentName() {
		return componentName;
	}
	public void setComponentName(String componentName) {
		this.componentName = componentName;
	}
	public List<OptionDto> getOptions() {
		return options;
	}
	public void setOptions(List<OptionDto> options) {
		this.options = options;
	} 
}
