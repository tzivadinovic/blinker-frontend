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
import { Employee } from './employee';
import { Customer } from './customer';
import { Currency } from './currency';
import { TransportTerm } from './transport-term';


export interface InvoiceDetails { 
    attn?: string;
    currency?: Currency;
    customer?: Customer;
    date?: string;
    employee?: Employee;
    grossWeight?: number;
    id?: number;
    itemsInfo?: string;
    netWeight?: number;
    number?: string;
    paymentConditions?: string;
    remarks?: string;
    shippingFees?: number;
    totalBoxes?: number;
    totalPrice?: number;
    transportTerm?: TransportTerm;
}

