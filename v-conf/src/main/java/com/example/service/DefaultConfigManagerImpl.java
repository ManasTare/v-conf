package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dto.DefaultConfigurationDTO;
import com.example.models.VehicleDefaultConfig;
import com.example.repository.DefaultConfigRepository;

@Service
public class DefaultConfigManagerImpl implements DefaultConfigManager{

	@Autowired
	DefaultConfigRepository repository;
	
	@Override
	@Transactional
	public List<DefaultConfigurationDTO> getDefaultConfiguration(Integer id) {
		// TODO Auto-generated method stub
		List<VehicleDefaultConfig> list=repository.findByModel_Id(id);
		
		List<DefaultConfigurationDTO> mylist=list.stream().map(v->new DefaultConfigurationDTO(v.getComp().getCompId(),
				v.getComp().getType())).toList();
		
		return mylist;
	}

}
