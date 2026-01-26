package com.example.controller;

import com.example.dto.ManufacturerDTO;
import com.example.dto.ModelDTO;
import com.example.dto.SegmentDTO;
import com.example.models.Manufacturer;
import com.example.models.Segment;
import com.example.service.WelcomeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/welcome")
@CrossOrigin
public class WelcomeController {

    private final WelcomeService welcomeService;

    public WelcomeController(WelcomeService welcomeService) {
        this.welcomeService = welcomeService;
    }

    @GetMapping("/segments")
    public List<SegmentDTO> getSegments() {
        return welcomeService.getAllSegments();
    }

    @GetMapping("/manufacturers/{segId}")
    public List<ManufacturerDTO> getManufacturers(@PathVariable Integer segId) {
        return welcomeService.getManufacturersBySegment(segId);
    }

    @GetMapping("/models")
    public List<ModelDTO> getModels(
            @RequestParam Integer segId,
            @RequestParam Integer mfgId) {
        return welcomeService.getModels(segId, mfgId);
    }
}
