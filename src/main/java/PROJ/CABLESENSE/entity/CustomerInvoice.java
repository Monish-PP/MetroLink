package PROJ.CABLESENSE.sales;

import PROJ.CABLESENSE.customer.Customer;
import PROJ.CABLESENSE.transit.TransitCorridor;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class CustomerInvoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String invoiceNumber;
    
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
    
    @ManyToOne
    @JoinColumn(name = "sales_order_id")
    private SalesOrder salesOrder;
    
    private String billingPeriod;
    
    @ManyToOne
    @JoinColumn(name = "corridor_id")
    private TransitCorridor corridor;
    
    private Integer passengerTrips;
    private Double rate;
    private Double subtotal;
    private Double tax;
    private Double total;
    private LocalDate dueDate;
    private String status;
}
