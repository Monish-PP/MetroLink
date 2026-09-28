package PROJ.CABLESENSE.terminal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cablecar/terminals")
@CrossOrigin(origins = "*")
public class TerminalController {
    @Autowired
    private TerminalRepository repository;

    @GetMapping
    public List<Terminal> getAll() { return repository.findAll(); }
    
    @PostMapping
    public Terminal create(@RequestBody Terminal entity) { return repository.save(entity); }
}
