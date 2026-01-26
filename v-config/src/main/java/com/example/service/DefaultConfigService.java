package com.example.service;

import com.example.dto.*;
import com.example.models.*;
import com.example.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DefaultConfigService {

    private final ModelRepository modelRepo;
    private final VehicleDetailRepository vehicleRepo;

    public DefaultConfigService(
            ModelRepository modelRepo,
            VehicleDetailRepository vehicleRepo
    ) {
        this.modelRepo = modelRepo;
        this.vehicleRepo = vehicleRepo;
    }

    public DefaultConfigResponseDTO getDefaultConfiguration(
            Integer modelId,
            Integer quantity
    ) {

        Model model = modelRepo.findByIdWithSegAndMfg(modelId)
                .orElseThrow(() -> new RuntimeException("Invalid model"));

        List<ComponentDTO> components =
                vehicleRepo.findDefaultComponents(modelId)
                        .stream()
                        .map(v -> new ComponentDTO(
                                v.getComp().getId(),
                                v.getComp().getCompName()
                        ))
                        .toList();

        double unitPrice = model.getPrice();
        double totalPrice = unitPrice * quantity;

        return new DefaultConfigResponseDTO(
                model.getId(),
                model.getModelName(),
                model.getSeg().getSegName(),
                model.getMfg().getMfgName(),
                unitPrice,
                model.getMinQty(),
                totalPrice,
                components
        );
    }
}
