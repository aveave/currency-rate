package currency.controller;

import currency.model.dto.CurrencyRateDto;
import currency.service.CurrencyRateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CurrencyRateController {

    private final CurrencyRateService currencyRateService;

    @GetMapping("rate")
    public List<CurrencyRateDto> getCurrencyRate() {
        return currencyRateService.getCurrencyRate();
    }
}
