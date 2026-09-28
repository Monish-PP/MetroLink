package PROJ.CABLESENSE.reports;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/reports")
public class ReportController {
    @GetMapping("/dashboard")
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("status", "System Optimal");
        stats.put("activeCars", 12);
        stats.put("dailyPassengers", 4500);
        return stats;
    }
}
