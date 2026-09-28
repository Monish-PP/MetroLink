package PROJ.CABLESENSE.purchase;
import PROJ.CABLESENSE.accounting.AccountingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/finance")
@CrossOrigin(origins = "*")
public class PurchaseController {
    @Autowired private PurchaseOrderRepository poRepo;
    @Autowired private VendorBillRepository billRepo;
    @Autowired private AccountingService accountingService;

    @GetMapping("/purchase-orders")
    public List<PurchaseOrder> getPOs() { return poRepo.findAll(); }
    
    @PostMapping("/purchase-orders")
    public PurchaseOrder createPO(@RequestBody PurchaseOrder po) { return poRepo.save(po); }

    @GetMapping("/vendor-bills")
    public List<VendorBill> getBills() { return billRepo.findAll(); }
    
    @PostMapping("/vendor-bills")
    public VendorBill createBill(@RequestBody VendorBill bill) {
        VendorBill saved = billRepo.save(bill);
        // Automatically post accounting entries
        accountingService.postVendorBill(saved.getTotal(), "Mechanical Inspection Costs", saved.getBillNumber(), "Vendor Bill Post");
        return saved;
    }
}
