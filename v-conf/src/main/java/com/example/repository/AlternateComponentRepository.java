package com.example.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.models.AlternateComponentMaster;
import com.example.models.Component;
import com.example.models.Model;

@Repository
public interface AlternateComponentRepository extends JpaRepository<AlternateComponentMaster,Integer> {

	Optional<AlternateComponentMaster>
    findByModelAndComp(Model modelId, Component compId);
	
	@Query("""
			 SELECT COALESCE(SUM(a.deltaPrice),0)
			 FROM AlternateComponentMaster a
			 WHERE a.model.id = :modelId
			""")
			Double sumDeltaPriceByModelId(@Param("modelId") Integer modelId);
	
	boolean existsByModel_Id(Integer id);
	
	List<AlternateComponentMaster> findByModel_Id(Integer id);
}
