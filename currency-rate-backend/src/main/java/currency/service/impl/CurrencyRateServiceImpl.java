package currency.service.impl;

import currency.configuration.CurrencyRateProperties;
import currency.converter.CurrencyRateConverter;
import currency.model.dto.CurrencyRateDto;
import currency.model.entity.CurrencyRate;
import currency.repository.CurrencyRateRepository;
import currency.service.CurrencyRateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CurrencyRateServiceImpl implements CurrencyRateService {

    private static final String DOLLAR_IDENTIFIER = "Доллар США";
    private static final String EURO_IDENTIFIER = "Евро";

    private final CurrencyRateProperties currencyRateProperties;
    private final CurrencyRateRepository currencyRateRepository;
    private final CurrencyRateConverter currencyRateConverter;

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");

    @Override
    public List<CurrencyRateDto> getCurrencyRate() {
        List<CurrencyRate> currencyRates = currencyRateRepository.findAll();

        ArrayList<LocalDate> dates = getListMonthDates();
        if (dates.size() > currencyRates.size()) {
            List<LocalDate> currencyRateDates = currencyRates.stream()
                    .map(CurrencyRate::getCurrencyRateDate)
                    .collect(Collectors.toList());
            ;
            List<LocalDate> missedCurrencyRateDates = new ArrayList<>();
            for (LocalDate date : dates) {
                if (!currencyRateDates.contains(date)) {
                    missedCurrencyRateDates.add(date);
                }
            }
            try {
                List<CurrencyRate> newCurrencyRates = fetchCurrencyData(missedCurrencyRateDates);
                currencyRateRepository.saveAll(newCurrencyRates);
                currencyRates.addAll(newCurrencyRates);
            } catch (IOException e) {
                log.error("Impossible to load currency data from external source");
            }
        }
        return currencyRates.stream()
                .map(currencyRateConverter::currencyRateToDto)
                .collect(Collectors.toList());
    }

    private List<CurrencyRate> fetchCurrencyData(List<LocalDate> missedCurrencyRateDates) throws IOException {
        List<CurrencyRate> newCurrencyRates = new ArrayList<>();
        for (LocalDate date : missedCurrencyRateDates) {
            newCurrencyRates.add(getRateForCurrentDate(date));
        }
        return newCurrencyRates;
    }

    private CurrencyRate getRateForCurrentDate(LocalDate dateToFetch) throws IOException {
        String dateValue = dateToFetch.format(formatter);
        Document document = Jsoup.connect(currencyRateProperties.getCurrencyInfoUrl() + dateValue).get();
        Optional<Element> dollarElement = getCurrencyData(document, DOLLAR_IDENTIFIER);
        Optional<Element> euroElement = getCurrencyData(document, EURO_IDENTIFIER);

        CurrencyRate currencyRate = new CurrencyRate();
        currencyRate.setCurrencyRateDate(dateToFetch);
        currencyRate.setDollarRate(dollarElement.isPresent() ?
                dollarElement.get().nextElementSibling().text() :
                "N/A");
        currencyRate.setEuroRate(euroElement.isPresent() ?
                euroElement.get().nextElementSibling().text() :
                "N/A");
        return currencyRate;
    }

    private Optional<Element> getCurrencyData(Document document, String identifier) {
        return document.select("td")
                .stream()
                .filter(element -> identifier.equals(element.text()))
                .findFirst();
    }

    private ArrayList<LocalDate> getListMonthDates() {
        LocalDate now = LocalDate.now();
        LocalDate lastMonth = now.minusMonths(1);
        ArrayList<LocalDate> list = new ArrayList<>();
        while (!lastMonth.equals(now)) {
            lastMonth = lastMonth.plusDays(1);
            list.add(lastMonth);
        }
        return list;
    }
}
