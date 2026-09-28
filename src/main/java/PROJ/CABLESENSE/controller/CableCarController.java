package PROJ.CABLESENSE.cablecar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cablecar/cable-cars")
@CrossOrigin(origins = "*")
public class CableCarController {
    @Autowired
    private CableCarRepository repository;

    @GetMapping
    public List<CableCar> getAll() { return repository.findAll(); }
    
    @PostMapping
    public CableCar create(@RequestBody CableCar entity) { return repository.save(entity); }
}
