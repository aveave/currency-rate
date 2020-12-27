import { State, Action, StateContext, Selector } from '@ngxs/store';
import { CurrencyRateModel } from './currency-rate.interfaces';
import { GetCurrencyRates } from './currency-rate.actions';
import { CurrencyRateService } from './currency-rate.service';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

export function createInitialCurrencyRate(): CurrencyRateModel {
    return {
       currencyRates: [],
       isLoaded: false
    }
}

@Injectable({ providedIn: 'root' })
@State<CurrencyRateModel>({
    name: 'currencyRate',
    defaults: createInitialCurrencyRate(),
})
export class CurrencyRateState {

    constructor(private currencyRateService: CurrencyRateService) {}

    @Selector()
    static getCurrencyRates(state: CurrencyRateModel) {
        return state.currencyRates;
    }

    @Selector()
    static isLoaded(state: CurrencyRateModel) {
        return state.isLoaded;
    }

    @Action(GetCurrencyRates)
    getCurrencyRates({getState, setState}: StateContext<CurrencyRateModel>) {
        return this.currencyRateService.getCurrencyRate().pipe(
            tap(result => {
                const state = getState();
                setState({
                    ...state,
                    currencyRates: result,
                    isLoaded: true,
                });
            })
        );
    }
}