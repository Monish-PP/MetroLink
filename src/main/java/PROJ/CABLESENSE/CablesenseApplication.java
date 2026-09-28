package PROJ.CABLESENSE;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CablesenseApplication {

	public static void main(String[] args) {
		SpringApplication.run(CablesenseApplication.class, args);
	}

}
