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
/* tslint:disable:no-unused-variable member-ordering */

import {Inject, Injectable, Optional} from '@angular/core';
import {
  HttpClient, HttpHeaders, HttpParams,
  HttpResponse, HttpEvent, HttpParameterCodec
} from '@angular/common/http';
import {CustomHttpParameterCodec} from '../encoder';
import {Observable} from 'rxjs';

import {ProductInvoice} from '../model/models';
import {ResponseValueint} from '../model/models';

import {BASE_PATH, COLLECTION_FORMATS} from '../variables';
import {ApiConfiguration} from '../configuration';
import {
  ProductInvoiceControllerServiceInterface
} from './product-invoice-controller.serviceInterface';


@Injectable({
  providedIn: 'root'
})
export class ProductInvoiceControllerService implements ProductInvoiceControllerServiceInterface {

  protected basePath = 'http://bar:8080';
  public defaultHeaders = new HttpHeaders();
  public configuration = new ApiConfiguration();
  public encoder: HttpParameterCodec;

  constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: ApiConfiguration) {
    if (configuration) {
      this.configuration = configuration;
    }
    if (typeof this.configuration.basePath !== 'string') {
      if (typeof basePath !== 'string') {
        basePath = this.basePath;
      }
      this.configuration.basePath = basePath;
    }
    this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
  }


  private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
    if (typeof value === 'object' && value instanceof Date === false) {
      httpParams = this.addToHttpParamsRecursive(httpParams, value);
    } else {
      httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
    }
    return httpParams;
  }

  private addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
    if (value == null) {
      return httpParams;
    }

    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        (value as any[]).forEach(elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
      } else if (value instanceof Date) {
        if (key != null) {
          httpParams = httpParams.append(key,
            (value as Date).toISOString().substr(0, 10));
        } else {
          throw Error('key may not be null if value is Date');
        }
      } else {
        Object.keys(value).forEach(k => httpParams = this.addToHttpParamsRecursive(
          httpParams, value[k], key != null ? `${key}.${k}` : k));
      }
    } else if (key != null) {
      httpParams = httpParams.append(key, value);
    } else {
      throw Error('key may not be null if value is not object or array');
    }
    return httpParams;
  }

  /**
   * deleteProductInvoiceById
   * @param productInvoiceId productInvoiceId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public deleteProductInvoiceById(productInvoiceId: number, observe?: 'body', reportProgress?: boolean, options?: { httpHeaderAccept?: undefined }): Observable<any>;
  public deleteProductInvoiceById(productInvoiceId: number, observe?: 'response', reportProgress?: boolean, options?: { httpHeaderAccept?: undefined }): Observable<HttpResponse<any>>;
  public deleteProductInvoiceById(productInvoiceId: number, observe?: 'events', reportProgress?: boolean, options?: { httpHeaderAccept?: undefined }): Observable<HttpEvent<any>>;
  public deleteProductInvoiceById(productInvoiceId: number, observe: any = 'body', reportProgress: boolean = false, options?: { httpHeaderAccept?: undefined }): Observable<any> {
    if (productInvoiceId === null || productInvoiceId === undefined) {
      throw new Error('Required parameter productInvoiceId was null or undefined when calling deleteProductInvoiceById.');
    }

    let headers = this.defaultHeaders;

    let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = [];
      httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }


    let responseType: 'text' | 'json' = 'json';
    if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
      responseType = 'text';
    }

    return this.httpClient.delete<any>(`${this.configuration.basePath}/product-invoices/${encodeURIComponent(String(productInvoiceId))}`,
      {
        responseType: <any> responseType,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * findByInvoiceId
   * @param invoiceId invoiceId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public findByInvoiceId(invoiceId: number, observe?: 'body', reportProgress?: boolean, options?: { httpHeaderAccept?: '*/*' }): Observable<Array<ProductInvoice>>;
  public findByInvoiceId(invoiceId: number, observe?: 'response', reportProgress?: boolean, options?: { httpHeaderAccept?: '*/*' }): Observable<HttpResponse<Array<ProductInvoice>>>;
  public findByInvoiceId(invoiceId: number, observe?: 'events', reportProgress?: boolean, options?: { httpHeaderAccept?: '*/*' }): Observable<HttpEvent<Array<ProductInvoice>>>;
  public findByInvoiceId(invoiceId: number, observe: any = 'body', reportProgress: boolean = false, options?: { httpHeaderAccept?: '*/*' }): Observable<any> {
    if (invoiceId === null || invoiceId === undefined) {
      throw new Error('Required parameter invoiceId was null or undefined when calling findByInvoiceId.');
    }

    let headers = this.defaultHeaders;

    let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = [
        '*/*'
      ];
      httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }


    let responseType: 'text' | 'json' = 'json';
    if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
      responseType = 'text';
    }

    return this.httpClient.get<Array<ProductInvoice>>(`${this.configuration.basePath}/product-invoices/invoice/${encodeURIComponent(String(invoiceId))}`,
      {
        responseType: <any> responseType,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * getAllProductInvoices
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getAllProductInvoices(observe?: 'body', reportProgress?: boolean, options?: { httpHeaderAccept?: '*/*' }): Observable<Array<ProductInvoice>>;
  public getAllProductInvoices(observe?: 'response', reportProgress?: boolean, options?: { httpHeaderAccept?: '*/*' }): Observable<HttpResponse<Array<ProductInvoice>>>;
  public getAllProductInvoices(observe?: 'events', reportProgress?: boolean, options?: { httpHeaderAccept?: '*/*' }): Observable<HttpEvent<Array<ProductInvoice>>>;
  public getAllProductInvoices(observe: any = 'body', reportProgress: boolean = false, options?: { httpHeaderAccept?: '*/*' }): Observable<any> {

    let headers = this.defaultHeaders;

    let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = [
        '*/*'
      ];
      httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }


    let responseType: 'text' | 'json' = 'json';
    if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
      responseType = 'text';
    }

    return this.httpClient.get<Array<ProductInvoice>>(`${this.configuration.basePath}/product-invoices`,
      {
        responseType: <any> responseType,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * getProductInvoiceById
   * @param productInvoiceId productInvoiceId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getProductInvoiceById(productInvoiceId: number, observe?: 'body', reportProgress?: boolean, options?: { httpHeaderAccept?: '*/*' }): Observable<ProductInvoice>;
  public getProductInvoiceById(productInvoiceId: number, observe?: 'response', reportProgress?: boolean, options?: { httpHeaderAccept?: '*/*' }): Observable<HttpResponse<ProductInvoice>>;
  public getProductInvoiceById(productInvoiceId: number, observe?: 'events', reportProgress?: boolean, options?: { httpHeaderAccept?: '*/*' }): Observable<HttpEvent<ProductInvoice>>;
  public getProductInvoiceById(productInvoiceId: number, observe: any = 'body', reportProgress: boolean = false, options?: { httpHeaderAccept?: '*/*' }): Observable<any> {
    if (productInvoiceId === null || productInvoiceId === undefined) {
      throw new Error('Required parameter productInvoiceId was null or undefined when calling getProductInvoiceById.');
    }

    let headers = this.defaultHeaders;

    let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = [
        '*/*'
      ];
      httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }


    let responseType: 'text' | 'json' = 'json';
    if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
      responseType = 'text';
    }

    return this.httpClient.get<ProductInvoice>(`${this.configuration.basePath}/product-invoices/${encodeURIComponent(String(productInvoiceId))}`,
      {
        responseType: <any> responseType,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * saveProductInvoice
   * @param productInvoice productInvoice
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public saveProductInvoice(productInvoice: ProductInvoice, observe?: 'body', reportProgress?: boolean, options?: { httpHeaderAccept?: '*/*' }): Observable<ProductInvoice>;
  public saveProductInvoice(productInvoice: ProductInvoice, observe?: 'response', reportProgress?: boolean, options?: { httpHeaderAccept?: '*/*' }): Observable<HttpResponse<ProductInvoice>>;
  public saveProductInvoice(productInvoice: ProductInvoice, observe?: 'events', reportProgress?: boolean, options?: { httpHeaderAccept?: '*/*' }): Observable<HttpEvent<ProductInvoice>>;
  public saveProductInvoice(productInvoice: ProductInvoice, observe: any = 'body', reportProgress: boolean = false, options?: { httpHeaderAccept?: '*/*' }): Observable<any> {
    if (productInvoice === null || productInvoice === undefined) {
      throw new Error('Required parameter productInvoice was null or undefined when calling saveProductInvoice.');
    }

    let headers = this.defaultHeaders;

    let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = [
        '*/*'
      ];
      httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }


    // to determine the Content-Type header
    const consumes: string[] = [
      'application/json'
    ];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected !== undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    let responseType: 'text' | 'json' = 'json';
    if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
      responseType = 'text';
    }

    return this.httpClient.post<ProductInvoice>(`${this.configuration.basePath}/product-invoices`,
      productInvoice,
      {
        responseType: <any> responseType,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * getTotalBoxes
   * @param invoiceId invoiceId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public totalBoxes(invoiceId: number, observe?: 'body', reportProgress?: boolean, options?: { httpHeaderAccept?: '*/*' }): Observable<ResponseValueint>;
  public totalBoxes(invoiceId: number, observe?: 'response', reportProgress?: boolean, options?: { httpHeaderAccept?: '*/*' }): Observable<HttpResponse<ResponseValueint>>;
  public totalBoxes(invoiceId: number, observe?: 'events', reportProgress?: boolean, options?: { httpHeaderAccept?: '*/*' }): Observable<HttpEvent<ResponseValueint>>;
  public totalBoxes(invoiceId: number, observe: any = 'body', reportProgress: boolean = false, options?: { httpHeaderAccept?: '*/*' }): Observable<any> {
    if (invoiceId === null || invoiceId === undefined) {
      throw new Error('Required parameter invoiceId was null or undefined when calling totalBoxes.');
    }

    let headers = this.defaultHeaders;

    let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = [
        '*/*'
      ];
      httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }


    let responseType: 'text' | 'json' = 'json';
    if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
      responseType = 'text';
    }

    return this.httpClient.get<ResponseValueint>(`${this.configuration.basePath}/product-invoices/invoice/totalBoxes/${encodeURIComponent(String(invoiceId))}`,
      {
        responseType: <any> responseType,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * getInvoiceTotalValue
   * @param invoiceId invoiceId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public totalValue(invoiceId: number, observe?: 'body', reportProgress?: boolean, options?: { httpHeaderAccept?: '*/*' }): Observable<number>;
  public totalValue(invoiceId: number, observe?: 'response', reportProgress?: boolean, options?: { httpHeaderAccept?: '*/*' }): Observable<HttpResponse<number>>;
  public totalValue(invoiceId: number, observe?: 'events', reportProgress?: boolean, options?: { httpHeaderAccept?: '*/*' }): Observable<HttpEvent<number>>;
  public totalValue(invoiceId: number, observe: any = 'body', reportProgress: boolean = false, options?: { httpHeaderAccept?: '*/*' }): Observable<any> {
    if (invoiceId === null || invoiceId === undefined) {
      throw new Error('Required parameter invoiceId was null or undefined when calling totalValue.');
    }

    let headers = this.defaultHeaders;

    let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = [
        '*/*'
      ];
      httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }


    let responseType: 'text' | 'json' = 'json';
    if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
      responseType = 'text';
    }

    return this.httpClient.get<number>(`${this.configuration.basePath}/product-invoices/invoice/totalValue/${encodeURIComponent(String(invoiceId))}`,
      {
        responseType: <any> responseType,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * updateProductInvoice
   * @param productInvoice productInvoice
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public updateProductInvoice(productInvoice: ProductInvoice, observe?: 'body', reportProgress?: boolean, options?: { httpHeaderAccept?: '*/*' }): Observable<ProductInvoice>;
  public updateProductInvoice(productInvoice: ProductInvoice, observe?: 'response', reportProgress?: boolean, options?: { httpHeaderAccept?: '*/*' }): Observable<HttpResponse<ProductInvoice>>;
  public updateProductInvoice(productInvoice: ProductInvoice, observe?: 'events', reportProgress?: boolean, options?: { httpHeaderAccept?: '*/*' }): Observable<HttpEvent<ProductInvoice>>;
  public updateProductInvoice(productInvoice: ProductInvoice, observe: any = 'body', reportProgress: boolean = false, options?: { httpHeaderAccept?: '*/*' }): Observable<any> {
    if (productInvoice === null || productInvoice === undefined) {
      throw new Error('Required parameter productInvoice was null or undefined when calling updateProductInvoice.');
    }

    let headers = this.defaultHeaders;

    let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = [
        '*/*'
      ];
      httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }


    // to determine the Content-Type header
    const consumes: string[] = [
      'application/json'
    ];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected !== undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    let responseType: 'text' | 'json' = 'json';
    if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
      responseType = 'text';
    }

    return this.httpClient.put<ProductInvoice>(`${this.configuration.basePath}/product-invoices`,
      productInvoice,
      {
        responseType: <any> responseType,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

}
