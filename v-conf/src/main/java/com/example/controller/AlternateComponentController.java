package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.AlternateComponentSaveDTO;
import com.example.service.AlternateComponentManager;

@RestController
@RequestMapping("/api/alternate-component")
public class AlternateComponentController {

    @Autowired
    private AlternateComponentManager service;

    @PostMapping("/save")
    public ResponseEntity<String> saveAlternateComponent(
            @RequestBody AlternateComponentSaveDTO dto) {

        service.saveAlternateComponents(dto);
        return ResponseEntity.ok("Alternate components saved successfully");
    }
}

