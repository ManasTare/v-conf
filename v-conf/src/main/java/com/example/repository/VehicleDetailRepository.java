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
    
    @Query("""
    	       SELECT v.comp.compName
    	       FROM VehicleDetail v
    	       WHERE v.model.id = :modelId
    	         AND v.isConfig = 'Y'
    	         AND v.compType = :compType
    	       """)
    	List<String> findConfigurableVehicleDetails(
    	        @Param("modelId") Integer modelId,
    	        @Param("compType") String compType
    	);

    @Query("""
    		 SELECT vd
    		 FROM VehicleDetail vd
    		 JOIN FETCH vd.comp c
    		 WHERE vd.model.id = :modelId
    		 AND vd.compType = :compType
    		 AND vd.isConfig = 'Y'
    		""")
    		List<VehicleDetail> findConfigurableComponents(
    				@Param("modelId")Integer modelId,
    				@Param("compType") String compType
    		);
     
}
