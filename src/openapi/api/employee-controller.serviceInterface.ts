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

import { Employee } from '../model/models';


import { ApiConfiguration }                                     from '../configuration';



export interface EmployeeControllerServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: ApiConfiguration;

    /**
     * deleteEmployeeById
     * 
     * @param employeeId employeeId
     */
    deleteEmployeeById(employeeId: number, extraHttpRequestParams?: any): Observable<{}>;

    /**
     * getAllEmployees
     * 
     */
    getAllEmployees(extraHttpRequestParams?: any): Observable<Array<Employee>>;

    /**
     * getEmployeeById
     * 
     * @param employeeId employeeId
     */
    getEmployeeById(employeeId: number, extraHttpRequestParams?: any): Observable<Employee>;

    /**
     * saveEmployee
     * 
     * @param employee employee
     */
    saveEmployee(employee: Employee, extraHttpRequestParams?: any): Observable<Employee>;

    /**
     * updateEmployee
     * 
     * @param employee employee
     */
    updateEmployee(employee: Employee, extraHttpRequestParams?: any): Observable<Employee>;

}
