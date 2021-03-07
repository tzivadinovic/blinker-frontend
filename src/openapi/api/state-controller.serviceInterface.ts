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

import { State } from '../model/models';


import { ApiConfiguration }                                     from '../configuration';



export interface StateControllerServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: ApiConfiguration;

    /**
     * deleteStateById
     * 
     * @param stateId stateId
     */
    deleteStateById(stateId: number, extraHttpRequestParams?: any): Observable<{}>;

    /**
     * getAllStates
     * 
     */
    getAllStates(extraHttpRequestParams?: any): Observable<Array<State>>;

    /**
     * getStateById
     * 
     * @param stateId stateId
     */
    getStateById(stateId: number, extraHttpRequestParams?: any): Observable<State>;

    /**
     * saveState
     * 
     * @param state state
     */
    saveState(state: State, extraHttpRequestParams?: any): Observable<State>;

    /**
     * updateState
     * 
     * @param state state
     */
    updateState(state: State, extraHttpRequestParams?: any): Observable<State>;

}