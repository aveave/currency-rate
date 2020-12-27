import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrencyRateTableComponent } from './currency-rate/currency-rate-table/currency-rate-table.component';
import { CurrencyRateChartComponent } from './currency-rate/currency-rate-chart/currency-rate-chart.component';

const routes: Routes = [
  { path: 'currency-rate', component: CurrencyRateTableComponent },
  { path: 'currency-rate-chart', component: CurrencyRateChartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
