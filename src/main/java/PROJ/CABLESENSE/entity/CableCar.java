package PROJ.CABLESENSE.cablecar;

import PROJ.CABLESENSE.transit.TransitCorridor;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class CableCar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String vehicleCode;
    private String vehicleName;
    
    @ManyToOne
    @JoinColumn(name = "corridor_id")
    private TransitCorridor corridor;
    
    private Integer capacity;
    private Double currentSpeed;
    private String motorStatus;
    private String operationalStatus;
    private String maintenanceStatus;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() { createdAt = LocalDateTime.now(); updatedAt = LocalDateTime.now(); }
    @PreUpdate
    protected void onUpdate() { updatedAt = LocalDateTime.now(); }
}
