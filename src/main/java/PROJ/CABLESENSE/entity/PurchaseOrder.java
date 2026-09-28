package PROJ.CABLESENSE.purchase;

import PROJ.CABLESENSE.product.ProductService;
import PROJ.CABLESENSE.transit.TransitCorridor;
import PROJ.CABLESENSE.vendor.Vendor;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class PurchaseOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String poNumber;
    
    @ManyToOne
    @JoinColumn(name = "vendor_id")
    private Vendor vendor;
    
    @ManyToOne
    @JoinColumn(name = "corridor_id")
    private TransitCorridor corridor;
    
    @ManyToOne
    @JoinColumn(name = "service_id")
    private ProductService service;
    
    private Integer quantity;
    private Double rate;
    private Double subtotal;
    private Double tax;
    private Double total;
    private LocalDate expectedDate;
    private String status;
}
