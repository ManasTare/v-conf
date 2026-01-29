package com.example.repository;

import com.example.models.Model;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ModelRepository extends JpaRepository<Model, Integer> {

    // ✅ USED BY WelcomeService (models dropdown)
    List<Model> findByMfg_IdAndSeg_Id(Integer mfgId, Integer segId);

    // ✅ USED BY DefaultConfigService (avoid LazyInitializationException)
    @Query("""
        select m
        from Model m
        join fetch m.seg
        join fetch m.mfg
        where m.id = :modelId
    """)
    Optional<Model> findByIdWithSegAndMfg(@Param("modelId") Integer modelId);
    
    Optional<Model> findById(Integer id);
}
