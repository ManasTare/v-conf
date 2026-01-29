package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dto.AlternateComponentDTO;
import com.example.dto.AlternateComponentSaveDTO;
import com.example.models.AlternateComponentMaster;
import com.example.models.Component;
import com.example.models.Model;
import com.example.repository.AlternateComponentRepository;
import com.example.repository.ComponentRepository;
import com.example.repository.ModelRepository;

@Service
public class AlternateComponentManagerImpl implements AlternateComponentManager{

	@Autowired
	private AlternateComponentRepository repo;
	
	  @Autowired
	    private ComponentRepository componentRepository;
	  
	  @Autowired
	  private ModelRepository modelRepository;
	
	@Override
	public void saveAlternateComponents(AlternateComponentSaveDTO dto) {
		// TODO Auto-generated method stub
		 Integer modelId = dto.getModelId();
		 Model model=modelRepository.findById(modelId).get();
		 

	        for (AlternateComponentDTO item : dto.getComponents()) {


	            Component original = componentRepository
	                    .findById(item.getCompId())
	                    .orElseThrow(() ->
	                        new RuntimeException("Original component not found"));

	
	            Component alternate = componentRepository
	                    .findById(item.getAltCompId())
	                    .orElseThrow(() ->
	                        new RuntimeException("Alternate component not found"));

	      
	            if (!original.getCompName().equals(alternate.getCompName())) {
	                throw new RuntimeException("Invalid component replacement");
	            }

	   
	            double deltaPrice = alternate.getPrice() - original.getPrice();

	   
	            AlternateComponentMaster acm =
	                repo
	                    .findByModelAndComp(model, original)
	                    .orElse(new AlternateComponentMaster());

	        
	            acm.setModel(model);
	            acm.setComp(original);
	            acm.setAltComp(alternate);
	            acm.setDeltaPrice(deltaPrice);

	          
	            repo.save(acm);
		
	}

}}
