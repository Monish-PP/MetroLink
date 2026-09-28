package PROJ.CABLESENSE.telemetry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cablecar")
@CrossOrigin(origins = "*")
public class TelemetryController {

    @Autowired
    private TelemetrySimulationService simulationService;

    @Autowired
    private TelemetryRepository telemetryRepository;

    @PostMapping("/simulation/start")
    public String startSimulation() {
        simulationService.startSimulation();
        return "Simulation started";
    }

    @PostMapping("/simulation/stop")
    public String stopSimulation() {
        simulationService.stopSimulation();
        return "Simulation stopped";
    }

    @GetMapping("/simulation/status")
    public boolean getSimulationStatus() {
        return simulationService.getStatus();
    }

    @GetMapping("/telemetry")
    public List<Telemetry> getAllTelemetry() {
        return telemetryRepository.findAll();
    }
}
