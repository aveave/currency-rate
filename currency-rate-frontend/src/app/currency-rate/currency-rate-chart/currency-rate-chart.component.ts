import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts'; 
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { CurrencyRate } from '../../../store/currency-rate/currency-rate.interfaces';
import { CurrencyRateState } from '../../../store/currency-rate/currency-rate.state';
import { GetCurrencyRates } from '../../../store/currency-rate/currency-rate.actions';

@Component({
  selector: 'app-currency-rate-chart',
  templateUrl: './currency-rate-chart.component.html',
  styleUrls: ['./currency-rate-chart.component.css']
})
export class CurrencyRateChartComponent implements OnInit {

  ratesChartData: ChartDataSets[] = [];
  chartLabels: Label[] = [];

  lineChartOptions = {
    responsive: true,
  };
  lineChartType = 'line';

  @Select(CurrencyRateState.getCurrencyRates) currencyRates: Observable<CurrencyRate[]>;
  @Select(CurrencyRateState.isLoaded) isLoaded;

  isLoadedSub: Subscription;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.isLoadedSub = this.isLoaded.pipe(
      tap((isLoaded) => {
        if (!isLoaded) {
          this.store.dispatch(new GetCurrencyRates());
        }
      })
    ).subscribe(value => {
      if (value) {
        console.log('rates are loaded')
      }
    })

  this.currencyRates.subscribe(currencyRates => {
    this.chartLabels = currencyRates.map(currencyRate => currencyRate.currencyRateDate);
    const dollarRates = currencyRates.map(currencyRate => parseFloat(currencyRate.dollarRate));
    const euroRates = currencyRates.map(currencyRate => parseFloat(currencyRate.euroRate));
    this.ratesChartData = [{data: dollarRates, label: 'Dollar rate'}, {data: euroRates, label: 'Euro rate'}];
  })
}
}
