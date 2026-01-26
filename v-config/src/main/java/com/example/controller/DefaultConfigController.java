package com.example.controller;

import com.example.dto.DefaultConfigResponseDTO;
import com.example.service.DefaultConfigService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/default-config")
@CrossOrigin
public class DefaultConfigController {

    private final DefaultConfigService service;

    public DefaultConfigController(DefaultConfigService service) {
        this.service = service;
    }

    @GetMapping("/{modelId}")
    public DefaultConfigResponseDTO getDefaultConfig(
            @PathVariable Integer modelId,
            @RequestParam Integer qty
    ) {
        return service.getDefaultConfiguration(modelId, qty);
        //Some Comment
    }
}
