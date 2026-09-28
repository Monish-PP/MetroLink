package PROJ.CABLESENSE.motordrive;

import PROJ.CABLESENSE.cablecar.CableCar;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class MotorDrive {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String motorCode;
    
    @OneToOne
    @JoinColumn(name = "cable_car_id")
    private CableCar cableCar;
    
    private Double ratedPowerKw;
    private Double currentPowerKw;
    private Double temperature;
    private String status;
    private LocalDate lastMaintenanceDate;
}
