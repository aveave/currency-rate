package currency.service;

import currency.model.dto.CurrencyRateDto;

import java.util.List;

public interface CurrencyRateService {

    List<CurrencyRateDto> getCurrencyRate();

}
