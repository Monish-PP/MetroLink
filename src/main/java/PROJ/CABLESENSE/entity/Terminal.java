package PROJ.CABLESENSE.terminal;

import PROJ.CABLESENSE.transit.TransitCorridor;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Terminal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String terminalCode;
    private String terminalName;
    private String location;
    private Double latitude;
    private Double longitude;
    
    @ManyToOne
    @JoinColumn(name = "corridor_id")
    private TransitCorridor corridor;
    
    private Integer passengerCapacity;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() { createdAt = LocalDateTime.now(); updatedAt = LocalDateTime.now(); }
    @PreUpdate
    protected void onUpdate() { updatedAt = LocalDateTime.now(); }
}
