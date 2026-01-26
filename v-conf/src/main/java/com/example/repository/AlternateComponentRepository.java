package com.example.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.models.AlternateComponentMaster;
import com.example.models.Component;
import com.example.models.Model;

@Repository
public interface AlternateComponentRepository extends JpaRepository<AlternateComponentMaster,Integer> {

	Optional<AlternateComponentMaster>
    findByModelAndComp(Model modelId, Component compId);
}
