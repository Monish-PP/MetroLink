package PROJ.CABLESENSE.transit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cablecar/corridors")
@CrossOrigin(origins = "*")
public class TransitController {
    @Autowired
    private TransitCorridorRepository repository;

    @GetMapping
    public List<TransitCorridor> getAll() { return repository.findAll(); }
    
    @PostMapping
    public TransitCorridor create(@RequestBody TransitCorridor entity) { return repository.save(entity); }
}
