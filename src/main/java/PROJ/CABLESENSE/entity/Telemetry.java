package PROJ.CABLESENSE.telemetry;

import PROJ.CABLESENSE.cablecar.CableCar;
import PROJ.CABLESENSE.terminal.Terminal;
import PROJ.CABLESENSE.transit.TransitCorridor;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Telemetry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "corridor_id")
    private TransitCorridor corridor;
    
    @ManyToOne
    @JoinColumn(name = "terminal_id")
    private Terminal terminal;
    
    @ManyToOne
    @JoinColumn(name = "cable_car_id")
    private CableCar cableCar;
    
    private Double cableTension;
    private Double motorPowerKw;
    private Integer passengerCount;
    private Double cableSpeed;
    private Double temperature;
    private LocalDateTime timestamp;
}
