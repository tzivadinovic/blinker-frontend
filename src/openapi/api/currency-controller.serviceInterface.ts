/**
 * Api Documentation
 * Api Documentation
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { HttpHeaders }                                       from '@angular/common/http';

import { Observable }                                        from 'rxjs';

import { Currency } from '../model/models';


import { ApiConfiguration }                                     from '../configuration';



export interface CurrencyControllerServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: ApiConfiguration;

    /**
     * deleteCurrencyById
     * 
     * @param currencyId currencyId
     */
    deleteCurrencyById(currencyId: number, extraHttpRequestParams?: any): Observable<{}>;

    /**
     * getAllCurrencies
     * 
     */
    getAllCurrencies(extraHttpRequestParams?: any): Observable<Array<Currency>>;

    /**
     * getCurrencyById
     * 
     * @param currencyId currencyId
     */
    getCurrencyById(currencyId: number, extraHttpRequestParams?: any): Observable<Currency>;

    /**
     * saveCurrency
     * 
     * @param currency currency
     */
    saveCurrency(currency: Currency, extraHttpRequestParams?: any): Observable<Currency>;

    /**
     * updateCurrency
     * 
     * @param currency currency
     */
    updateCurrency(currency: Currency, extraHttpRequestParams?: any): Observable<Currency>;

}
