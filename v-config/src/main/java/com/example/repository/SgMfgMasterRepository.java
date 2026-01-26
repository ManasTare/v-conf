package com.example.repository;

import com.example.models.SgMfgMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SgMfgMasterRepository extends JpaRepository<SgMfgMaster, Integer> {

    @Query("""
        select sm
        from SgMfgMaster sm
        join fetch sm.mfg
        where sm.seg.id = :segId
    """)
    List<SgMfgMaster> findBySegIdWithManufacturer(@Param("segId") Integer segId);
}
