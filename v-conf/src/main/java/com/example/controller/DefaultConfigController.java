package com.example.controller;

import com.example.dto.DefaultConfigResponseDTO;
import com.example.dto.DefaultConfigurationDTO;
import com.example.service.DefaultConfigManager;
import com.example.service.DefaultConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/default-config")
@CrossOrigin
public class DefaultConfigController {

    private final DefaultConfigService service;

    public DefaultConfigController(DefaultConfigService service) {
        this.service = service;
    }

    @Autowired
    private DefaultConfigManager manager;

    @GetMapping("/{modelId}")
    public DefaultConfigResponseDTO getDefaultConfig(
            @PathVariable Integer modelId,
            @RequestParam(defaultValue = "1") Integer qty
    ) {
        return service.getDefaultConfiguration(modelId, qty);
        //Some Comment
    }

    @GetMapping("/conf/{modelId}")
    public ResponseEntity<?> getDefault(@PathVariable Integer modelId){
        List<DefaultConfigurationDTO> list=manager.getDefaultConfiguration(modelId);

        return ResponseEntity.ok(list);
    }
}
