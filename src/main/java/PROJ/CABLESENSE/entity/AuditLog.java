package PROJ.CABLESENSE.audit;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class AuditLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String action;
    private String module;
    private String recordId;
    private LocalDateTime timestamp;
    private String oldValue;
    private String newValue;
}
