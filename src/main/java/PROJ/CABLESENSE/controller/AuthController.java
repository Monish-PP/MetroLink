package PROJ.CABLESENSE.auth;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {
    @PostMapping("/login")
    public ResponseEntity<String> login() {
        return ResponseEntity.ok("token");
    }
}
