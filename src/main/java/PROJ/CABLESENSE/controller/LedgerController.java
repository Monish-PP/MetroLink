package PROJ.CABLESENSE.accounting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/accounting")
@CrossOrigin(origins = "*")
public class LedgerController {
    @Autowired private JournalEntryRepository repo;

    @GetMapping("/ledger")
    public List<JournalEntry> getLedger() { return repo.findAll(); }
}
