package PROJ.CABLESENSE.safety;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cablecar/alerts")
@CrossOrigin(origins = "*")
public class SafetyAlertController {
    @Autowired
    private SafetyAlertRepository repository;

    @GetMapping
    public List<SafetyAlert> getAll() { return repository.findAll(); }
    
    @PostMapping
    public SafetyAlert create(@RequestBody SafetyAlert entity) { return repository.save(entity); }
}
