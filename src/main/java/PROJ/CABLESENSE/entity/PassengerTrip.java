package PROJ.CABLESENSE.passenger;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class PassengerTrip {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String ticketNumber;
    private String entryTerminal;
    private String exitTerminal;
    private Double fare;
    private LocalDateTime timestamp;
}
