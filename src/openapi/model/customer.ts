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
import { State } from './state';
import { City } from './city';


export interface Customer { 
    city?: City;
    createdDate?: string;
    id?: number;
    lastModifiedBy?: string;
    lastModifiedDate?: string;
    name?: string;
    recordStatus?: number;
    state?: State;
}
