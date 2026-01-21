package com.example.repository;

import com.example.models.VehicleDetail;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VehicleDetailRepository extends JpaRepository<VehicleDetail, Integer> {

    @Query("""
        select vd
        from VehicleDetail vd
        join fetch vd.comp
        where vd.model.id = :modelId
        and vd.isConfig = 'Y'
    """)
    List<VehicleDetail> findDefaultComponents(@Param("modelId") Integer modelId);
}
