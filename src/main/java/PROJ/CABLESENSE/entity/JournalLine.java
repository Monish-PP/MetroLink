package PROJ.CABLESENSE.accounting;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class JournalLine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "journal_entry_id")
    private JournalEntry journalEntry;
    
    private String account; // In real app, links to ChartOfAccounts entity
    private Double debit;
    private Double credit;
    private String description;
}
