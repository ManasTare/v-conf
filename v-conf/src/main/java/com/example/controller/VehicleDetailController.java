package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.IsConfigurationDTO;
import com.example.service.VehicalDetails;

@RestController
@RequestMapping("/vehicaldetail")
public class VehicleDetailController {
   
	@Autowired
	private VehicalDetails vehicaldetail;
	
	@PostMapping("/config")
	public ResponseEntity<?>  ConfigurableComponent(@RequestBody IsConfigurationDTO dto){
		List<String> list= vehicaldetail.isConfigurable(dto.getModelId(),dto.getCompType());
		return ResponseEntity.ok(list);
	}
}
