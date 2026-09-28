package PROJ.CABLESENSE.sales;
import PROJ.CABLESENSE.accounting.AccountingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/finance")
@CrossOrigin(origins = "*")
public class SalesController {
    @Autowired private SalesOrderRepository orderRepo;
    @Autowired private CustomerInvoiceRepository invoiceRepo;
    @Autowired private AccountingService accountingService;

    @GetMapping("/sales-orders")
    public List<SalesOrder> getOrders() { return orderRepo.findAll(); }
    
    @PostMapping("/sales-orders")
    public SalesOrder createOrder(@RequestBody SalesOrder order) { return orderRepo.save(order); }

    @GetMapping("/invoices")
    public List<CustomerInvoice> getInvoices() { return invoiceRepo.findAll(); }
    
    @PostMapping("/invoices")
    public CustomerInvoice createInvoice(@RequestBody CustomerInvoice invoice) {
        CustomerInvoice saved = invoiceRepo.save(invoice);
        // Automatically post accounting entries
        accountingService.postCustomerInvoice(saved.getTotal(), saved.getInvoiceNumber(), "Customer Invoice Post");
        return saved;
    }
}
