import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';  
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Select, Store } from '@ngxs/store';
import { CurrencyRate } from '../../../store/currency-rate/currency-rate.interfaces';
import { CurrencyRateState } from '../../../store/currency-rate/currency-rate.state';
import { GetCurrencyRates } from '../../../store/currency-rate/currency-rate.actions';

@Component({
  selector: 'app-currency-rate-table',
  templateUrl: './currency-rate-table.component.html',
  styleUrls: ['./currency-rate-table.component.css']
})
export class CurrencyRateTableComponent implements OnInit, OnDestroy {

  currencyRateList = new MatTableDataSource<CurrencyRate>(); 
  displayedColumns: string[] = ['dollarRate', 'euroRate', 'currencyRateDate'];

  @Select(CurrencyRateState.getCurrencyRates) currencyRates: Observable<CurrencyRate[]>;
  @Select(CurrencyRateState.isLoaded) isLoaded;

  isLoadedSub: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private store: Store) { }

  ngOnInit() {
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
                               this.currencyRateList = new MatTableDataSource<CurrencyRate>(currencyRates);
                               this.currencyRateList.paginator = this.paginator;
                               this.currencyRateList.sort = this.sort;
      });
  }

  ngOnDestroy() {
    this.isLoadedSub.unsubscribe();
  }
}