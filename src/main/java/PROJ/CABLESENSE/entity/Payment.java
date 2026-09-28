package PROJ.CABLESENSE.payment;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Payment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String referenceId;
    private Double amount;
    private String method;
    private String status;
    private LocalDateTime paymentDate;
}
