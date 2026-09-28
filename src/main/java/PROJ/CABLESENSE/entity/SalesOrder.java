package PROJ.CABLESENSE.sales;

import PROJ.CABLESENSE.customer.Customer;
import PROJ.CABLESENSE.transit.TransitCorridor;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
public class SalesOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String orderNumber;
    
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
    
    @ManyToOne
    @JoinColumn(name = "corridor_id")
    private TransitCorridor corridor;
    
    private LocalDate billingPeriodStart;
    private LocalDate billingPeriodEnd;
    private Integer passengerTrips;
    private Double ratePerPassenger;
    private Double subtotal;
    private Double tax;
    private Double total;
    private String status;
    private LocalDateTime createdAt;
}
