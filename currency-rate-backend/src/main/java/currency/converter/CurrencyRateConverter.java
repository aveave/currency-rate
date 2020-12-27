package currency.converter;

import currency.model.dto.CurrencyRateDto;
import currency.model.entity.CurrencyRate;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CurrencyRateConverter {

    @Mapping(target = "currencyRateDate", dateFormat = "dd.MM")
    CurrencyRateDto currencyRateToDto(CurrencyRate currencyRate);
}
