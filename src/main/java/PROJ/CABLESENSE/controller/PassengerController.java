package PROJ.CABLESENSE.passenger;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/passengers")
public class PassengerController {
    private final PassengerTripRepository repo;
    public PassengerController(PassengerTripRepository repo) { this.repo = repo; }
    @GetMapping
    public List<PassengerTrip> getAll() { return repo.findAll(); }
}
