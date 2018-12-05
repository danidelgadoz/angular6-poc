import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { HttpEndpoint } from '../../core/http/http-endpoint';

@Injectable()
export class CurrencyExchangeService {

    constructor(private http: HttpClient) { }

    getEuroEquivalent(amount: number): Observable<number> {
        let params = new HttpParams().set('access_key', environment.backend.secret );
        params = params.append('access_key', environment.backend.secret);
        params = params.append('base', 'USD');
        params = params.append('symbols', 'EUR');

        return this.http.get(HttpEndpoint.moneyExchange, { params: params })
                    .pipe(
                      map((response: any): number => {
                        const cambio: number = response.rates.EUR;
                        return Number(Number(amount * cambio).toFixed(2));
                      }),
                      catchError((err, caught) => EMPTY)
                    );
    }

}
