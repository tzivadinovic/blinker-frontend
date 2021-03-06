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

import { User } from '../model/models';


import { ApiConfiguration }                                     from '../configuration';



export interface UserControllerServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: ApiConfiguration;

    /**
     * deleteUserById
     * 
     * @param userId userId
     */
    deleteUserById(userId: number, extraHttpRequestParams?: any): Observable<{}>;

    /**
     * getAllUsers
     * 
     */
    getAllUsers(extraHttpRequestParams?: any): Observable<Array<User>>;

    /**
     * getUserById
     * 
     * @param userId userId
     */
    getUserById(userId: number, extraHttpRequestParams?: any): Observable<User>;

    /**
     * saveUser
     * 
     * @param user user
     */
    saveUser(user: User, extraHttpRequestParams?: any): Observable<User>;

    /**
     * updateUser
     * 
     * @param user user
     */
    updateUser(user: User, extraHttpRequestParams?: any): Observable<User>;

}
