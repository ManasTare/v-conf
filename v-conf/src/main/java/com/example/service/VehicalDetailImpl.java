package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.repository.VehicleDetailRepository;

@Service
public class VehicalDetailImpl implements VehicalDetails{

	
	@Autowired
	private VehicleDetailRepository vehicalRepository;
	
	@Override
	public List<String> isConfigurable(int modelId, String compType) {
		
		List<String> list=vehicalRepository.findConfigurableVehicleDetails(modelId, compType);
		
		return list;
	}

}
