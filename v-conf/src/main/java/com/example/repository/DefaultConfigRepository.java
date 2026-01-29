package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.models.VehicleDefaultConfig;

public interface DefaultConfigRepository extends JpaRepository<VehicleDefaultConfig,Integer>{

	List<VehicleDefaultConfig> findByModel_Id(Integer id);
	
	
}
