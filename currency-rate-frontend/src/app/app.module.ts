import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';  
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { NgxsModule } from '@ngxs/store';
import { MatTabsModule } from '@angular/material/tabs';
import { CurrencyRateTableComponent } from './currency-rate/currency-rate-table/currency-rate-table.component';
import { CurrencyRateState } from '../store/currency-rate/currency-rate.state';
import { CurrencyRateService } from '../store/currency-rate/currency-rate.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyRateChartComponent } from './currency-rate/currency-rate-chart/currency-rate-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyRateTableComponent,
    CurrencyRateChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ChartsModule,
    NgxsModule.forRoot([CurrencyRateState]),
    MatTabsModule
  ],
  providers: [CurrencyRateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
