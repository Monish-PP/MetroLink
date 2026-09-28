package PROJ.CABLESENSE.product;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ProductService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String code;
    private String name;
    private String description;
    private String type;
    private String unit;
    private Double rate;
    private Double taxRate;
    private Boolean active;
}
