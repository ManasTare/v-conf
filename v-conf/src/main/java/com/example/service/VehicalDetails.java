package com.example.service;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface VehicalDetails {
     
	List<String> isConfigurable(int modelId,String compType);
}
