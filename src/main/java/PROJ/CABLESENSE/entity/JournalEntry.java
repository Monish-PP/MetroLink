package PROJ.CABLESENSE.accounting;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
public class JournalEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String journalNumber;
    private String journalType;
    private LocalDate transactionDate;
    private String reference;
    private String description;
    private String status;
    
    @OneToMany(mappedBy = "journalEntry", cascade = CascadeType.ALL)
    private List<JournalLine> lines;
}
