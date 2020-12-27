package currency.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CurrencyRateDto {

    private Long id;

    private String dollarRate;

    private String euroRate;

    private String currencyRateDate;
}
