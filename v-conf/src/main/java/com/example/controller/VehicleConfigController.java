package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.ComponentDropdownDto;
import com.example.service.VehicleManager;

@RestController
@RequestMapping("/vehicle")
@CrossOrigin(origins = "http://localhost:5173")
public class VehicleConfigController {
	
	@Autowired
	VehicleManager manager;
	
	@GetMapping("/{modelId}/standard")
    public ResponseEntity<List<ComponentDropdownDto>> getStandardComponents(
            @PathVariable Integer modelId) {

        List<ComponentDropdownDto> list=manager.getConfigurableComponents(modelId, "S");
        
        return ResponseEntity.ok(list);
    }

 
    @GetMapping("/{modelId}/interior")
    public ResponseEntity<List<ComponentDropdownDto>> getInteriorComponents(
            @PathVariable Integer modelId) {

    	List<ComponentDropdownDto> list=manager.getConfigurableComponents(modelId, "I");
    	return ResponseEntity.ok(list);
    	
    }

    
    @GetMapping("/{modelId}/exterior")
    public ResponseEntity<List<ComponentDropdownDto>> getExteriorComponents(
            @PathVariable Integer modelId) {

    	List<ComponentDropdownDto> list=manager.getConfigurableComponents(modelId, "E");
    	return ResponseEntity.ok(list);
    	
    }

    @GetMapping("/{modelId}/accessories")
    public ResponseEntity<List<ComponentDropdownDto>> getAccessoryComponents(
            @PathVariable Integer modelId) {

    	List<ComponentDropdownDto> list=manager.getConfigurableComponents(modelId, "C");
    	
    	return ResponseEntity.ok(list);
    }
	
}
