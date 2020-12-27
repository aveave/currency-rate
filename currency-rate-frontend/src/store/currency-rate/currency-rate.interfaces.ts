export interface CurrencyRate {
     id: number;
     dollarRate: string;
     euroRate: string;
     currencyRateDate: string;
}

export interface CurrencyRateModel {
    currencyRates: CurrencyRate[];
    isLoaded: boolean;
}
