package PROJ.CABLESENSE.budget;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class BudgetLine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "budget_id")
    private Budget budget;
    
    private String category;
    private Double budgetAmount;
    private Double actualAmount;
}
