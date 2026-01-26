package com.example.service;

import java.util.List;

import com.example.dto.ComponentDropdownDto;

public interface VehicleManager {
	List<ComponentDropdownDto> getConfigurableComponents(Integer modelId,String compType);
}
