package PROJ.CABLESENSE.safety;

import PROJ.CABLESENSE.cablecar.CableCar;
import PROJ.CABLESENSE.terminal.Terminal;
import PROJ.CABLESENSE.transit.TransitCorridor;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class SafetyAlert {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String alertType;
    private String severity;
    
    @ManyToOne
    @JoinColumn(name = "corridor_id")
    private TransitCorridor corridor;
    
    @ManyToOne
    @JoinColumn(name = "terminal_id")
    private Terminal terminal;
    
    @ManyToOne
    @JoinColumn(name = "cable_car_id")
    private CableCar cableCar;
    
    private Double sensorValue;
    private Double thresholdValue;
    private String message;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime acknowledgedAt;
    private String acknowledgedBy;
}
