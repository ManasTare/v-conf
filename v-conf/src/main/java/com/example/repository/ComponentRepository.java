package com.example.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.models.Component;

public interface ComponentRepository extends JpaRepository<Component,Integer>{

	Optional<Component> findById(Integer compId);

}
