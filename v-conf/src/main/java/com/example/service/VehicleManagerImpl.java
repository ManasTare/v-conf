package com.example.service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dto.ComponentDropdownDto;
import com.example.dto.OptionDto;
import com.example.models.Component;
import com.example.models.VehicleDetail;
import com.example.repository.VehicleDetailRepository;

@Service
public class VehicleManagerImpl implements VehicleManager{

	@Autowired
	VehicleDetailRepository vehicleRepo;
	
	@Override
	public List<ComponentDropdownDto> getConfigurableComponents(Integer modelId, String compType) {
		
        List<VehicleDetail> details =
                vehicleRepo.findConfigurableComponents(modelId, compType);

       
        Map<String, List<OptionDto>> groupedMap = new LinkedHashMap<>();

        for (VehicleDetail vd : details) {

            Component comp = vd.getComp();

            String componentName = comp.getCompName();
            Integer compId = comp.getCompId();
            String subType = comp.getType();
            Double price = comp.getPrice();

            OptionDto option = new OptionDto(compId, subType, price);

            groupedMap
                .computeIfAbsent(componentName, k -> new ArrayList<>())
                .add(option);
        }

        List<ComponentDropdownDto> response = new ArrayList<>();

        for (Map.Entry<String, List<OptionDto>> entry : groupedMap.entrySet()) {
            response.add(
                new ComponentDropdownDto(
                        entry.getKey(),
                        entry.getValue()
                )
            );
        }

        return response;
	}

}
