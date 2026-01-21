package com.example.service;

import com.example.dto.*;
import com.example.models.*;
import com.example.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WelcomeService {

    private final SegmentRepository segmentRepo;
    private final ManufacturerRepository manufacturerRepo;
    private final SgMfgMasterRepository sgMfgRepo;
    private final ModelRepository modelRepo;

    public WelcomeService(
            SegmentRepository segmentRepo,
            ManufacturerRepository manufacturerRepo,
            SgMfgMasterRepository sgMfgRepo,
            ModelRepository modelRepo
    ) {
        this.segmentRepo = segmentRepo;
        this.manufacturerRepo = manufacturerRepo;
        this.sgMfgRepo = sgMfgRepo;
        this.modelRepo = modelRepo;
    }

    public List<SegmentDTO> getAllSegments() {
        return segmentRepo.findAll()
                .stream()
                .map(s -> new SegmentDTO(
                        s.getId(),
                        s.getSegName(),
                        null
                ))
                .collect(Collectors.toList());
    }

    public List<ManufacturerDTO> getManufacturersBySegment(Integer segId) {
        return sgMfgRepo.findBySeg_Id(segId)
                .stream()
                .map(SgMfgMaster::getMfg)
                .distinct()
                .map(m -> new ManufacturerDTO(
                        m.getId(),
                        m.getMfgName()
                ))
                .collect(Collectors.toList());
    }

    // ✅ THIS NOW WORKS
    public List<ModelDTO> getModels(Integer segId, Integer mfgId) {
        return modelRepo.findByMfg_IdAndSeg_Id(mfgId, segId)
                .stream()
                .map(m -> new ModelDTO(
                        m.getId(),
                        m.getModelName(),
                        m.getPrice(),
                        m.getMinQty(),
                        m.getImgPath()
                ))
                .collect(Collectors.toList());
    }
}
