package PROJ.CABLESENSE.purchase;

import PROJ.CABLESENSE.product.ProductService;
import PROJ.CABLESENSE.vendor.Vendor;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class VendorBill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String billNumber;
    
    @ManyToOne
    @JoinColumn(name = "vendor_id")
    private Vendor vendor;
    
    @ManyToOne
    @JoinColumn(name = "purchase_order_id")
    private PurchaseOrder purchaseOrder;
    
    @ManyToOne
    @JoinColumn(name = "service_id")
    private ProductService service;
    
    private Double subtotal;
    private Double tax;
    private Double total;
    private LocalDate dueDate;
    private String status;
}
