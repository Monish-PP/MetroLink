package PROJ.CABLESENSE.vendor;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Vendor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String vendorCode;
    private String name;
    private String contactPerson;
    private String email;
    private String phone;
    private String address;
    private String serviceCategory;
    private String paymentTerms;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
