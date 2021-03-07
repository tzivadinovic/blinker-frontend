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

import { TransportTerm } from '../model/models';


import { ApiConfiguration }                                     from '../configuration';



export interface TransportTermControllerServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: ApiConfiguration;

    /**
     * deleteTransportTermById
     * 
     * @param transportTermId transportTermId
     */
    deleteTransportTermById(transportTermId: number, extraHttpRequestParams?: any): Observable<{}>;

    /**
     * getAllTransportTerms
     * 
     */
    getAllTransportTerms(extraHttpRequestParams?: any): Observable<Array<TransportTerm>>;

    /**
     * getTransportTermById
     * 
     * @param transportTermId transportTermId
     */
    getTransportTermById(transportTermId: number, extraHttpRequestParams?: any): Observable<TransportTerm>;

    /**
     * saveTransportTerm
     * 
     * @param transportTerm transportTerm
     */
    saveTransportTerm(transportTerm: TransportTerm, extraHttpRequestParams?: any): Observable<TransportTerm>;

    /**
     * updateTransportTerm
     * 
     * @param transportTerm transportTerm
     */
    updateTransportTerm(transportTerm: TransportTerm, extraHttpRequestParams?: any): Observable<TransportTerm>;

}