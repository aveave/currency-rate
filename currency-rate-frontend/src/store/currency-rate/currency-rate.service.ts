import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CurrencyRate } from './currency-rate.interfaces';

@Injectable({
    providedIn: 'root'
})
export class CurrencyRateService {

    private baseUrl = 'http://localhost:8080/api/rate';

    constructor(private http: HttpClient) {}

    getCurrencyRate(): Observable<any> {
        return this.http.get<CurrencyRate>(this.baseUrl);
    }
}