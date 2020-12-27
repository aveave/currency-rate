package currency;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
public class CurrencyRateBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CurrencyRateBackendApplication.class, args);
	}

}
