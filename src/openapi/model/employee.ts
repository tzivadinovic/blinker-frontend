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
import { User } from './user';


export interface Employee { 
    address?: string;
    bank?: string;
    bankAccount?: string;
    createdDate?: string;
    employmentEndDate?: string;
    employmentStartDate?: string;
    firstName?: string;
    id?: number;
    lastModifiedBy?: string;
    lastModifiedDate?: string;
    lastName?: string;
    phoneNumber?: string;
    position?: string;
    recordStatus?: number;
    user?: User;
}

