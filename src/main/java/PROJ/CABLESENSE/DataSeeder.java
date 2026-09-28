package PROJ.CABLESENSE;

import PROJ.CABLESENSE.cablecar.CableCar;
import PROJ.CABLESENSE.cablecar.CableCarRepository;
import PROJ.CABLESENSE.terminal.Terminal;
import PROJ.CABLESENSE.terminal.TerminalRepository;
import PROJ.CABLESENSE.transit.TransitCorridor;
import PROJ.CABLESENSE.transit.TransitCorridorRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final TransitCorridorRepository corridorRepository;
    private final TerminalRepository terminalRepository;
    private final CableCarRepository cableCarRepository;

    public DataSeeder(TransitCorridorRepository corridorRepository, TerminalRepository terminalRepository, CableCarRepository cableCarRepository) {
        this.corridorRepository = corridorRepository;
        this.terminalRepository = terminalRepository;
        this.cableCarRepository = cableCarRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (corridorRepository.count() == 0) {
            TransitCorridor corridor = new TransitCorridor();
            corridor.setCorridorCode("M1");
            corridor.setCorridorName("Mountain Line 1");
            corridor.setDescription("Main tourist line");
            corridor.setStartTerminal("Base");
            corridor.setEndTerminal("Peak");
            corridor.setPassengerRate(15.0);
            corridor.setOperatingStartTime("06:00");
            corridor.setOperatingEndTime("22:00");
            corridor.setStatus("ACTIVE");
            corridorRepository.save(corridor);

            Terminal t1 = new Terminal();
            t1.setTerminalCode("T1");
            t1.setTerminalName("Base Terminal");
            t1.setLocation("Valley");
            t1.setLatitude(45.0);
            t1.setLongitude(9.0);
            t1.setCorridor(corridor);
            t1.setPassengerCapacity(500);
            t1.setStatus("ACTIVE");
            terminalRepository.save(t1);

            for (int i = 1; i <= 4; i++) {
                CableCar car = new CableCar();
                car.setVehicleCode("C" + i);
                car.setVehicleName("Car " + i);
                car.setCorridor(corridor);
                car.setCapacity(50);
                car.setCurrentSpeed(0.0);
                car.setMotorStatus("ON");
                car.setOperationalStatus("ACTIVE");
                car.setMaintenanceStatus("OK");
                cableCarRepository.save(car);
            }
        }
    }
}
