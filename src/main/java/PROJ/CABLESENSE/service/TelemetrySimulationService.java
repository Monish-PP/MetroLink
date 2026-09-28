package PROJ.CABLESENSE.telemetry;

import PROJ.CABLESENSE.cablecar.CableCar;
import PROJ.CABLESENSE.cablecar.CableCarRepository;
import PROJ.CABLESENSE.safety.SafetyAlert;
import PROJ.CABLESENSE.safety.SafetyAlertRepository;
import PROJ.CABLESENSE.terminal.Terminal;
import PROJ.CABLESENSE.terminal.TerminalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class TelemetrySimulationService {

    @Autowired
    private TelemetryRepository telemetryRepository;
    
    @Autowired
    private CableCarRepository cableCarRepository;

    @Autowired
    private TerminalRepository terminalRepository;

    @Autowired
    private SafetyAlertRepository safetyAlertRepository;

    private boolean isSimulating = false;
    private final Random random = new Random();

    public void startSimulation() {
        this.isSimulating = true;
    }

    public void stopSimulation() {
        this.isSimulating = false;
    }

    public boolean getStatus() {
        return this.isSimulating;
    }

    @Scheduled(fixedRate = 5000)
    public void generateTelemetry() {
        if (!isSimulating) return;

        List<CableCar> cars = cableCarRepository.findAll();
        List<Terminal> terminals = terminalRepository.findAll();

        if (cars.isEmpty() || terminals.isEmpty()) return;

        for (CableCar car : cars) {
            Telemetry t = new Telemetry();
            t.setCableCar(car);
            t.setCorridor(car.getCorridor());
            t.setTerminal(terminals.get(random.nextInt(terminals.size())));
            
            // Realistic variations
            t.setCableTension(75.0 + (random.nextDouble() * 20.0)); // 75-95
            t.setMotorPowerKw(100.0 + (random.nextDouble() * 80.0)); // 100-180
            t.setPassengerCount(10 + random.nextInt(41)); // 10-50
            t.setCableSpeed(4.0 + (random.nextDouble() * 4.0)); // 4-8
            t.setTemperature(25.0 + (random.nextDouble() * 45.0)); // 25-70
            t.setTimestamp(LocalDateTime.now());

            telemetryRepository.save(t);
            checkSafetyThresholds(t);
        }
    }

    private void checkSafetyThresholds(Telemetry t) {
        if (t.getCableTension() > 90.0) { // Warning > 85, Critical > 100
            createAlert(t, "TENSION_HIGH", t.getCableTension() > 100.0 ? "CRITICAL" : "WARNING", t.getCableTension(), 100.0);
        }
        if (t.getTemperature() > 75.0) {
            createAlert(t, "TEMP_HIGH", t.getTemperature() > 90.0 ? "CRITICAL" : "WARNING", t.getTemperature(), 90.0);
        }
        if (t.getPassengerCount() > 50) {
            createAlert(t, "CAPACITY_EXCEEDED", "CRITICAL", (double)t.getPassengerCount(), 50.0);
        }
    }

    private void createAlert(Telemetry t, String type, String severity, Double value, Double threshold) {
        SafetyAlert alert = new SafetyAlert();
        alert.setAlertType(type);
        alert.setSeverity(severity);
        alert.setCorridor(t.getCorridor());
        alert.setTerminal(t.getTerminal());
        alert.setCableCar(t.getCableCar());
        alert.setSensorValue(value);
        alert.setThresholdValue(threshold);
        alert.setMessage(type + " alert: recorded " + String.format("%.2f", value));
        alert.setStatus("ACTIVE");
        alert.setCreatedAt(LocalDateTime.now());
        safetyAlertRepository.save(alert);
    }
}
