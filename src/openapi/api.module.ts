import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { ApiConfiguration } from './configuration';
import { HttpClient } from '@angular/common/http';

import { BasicErrorControllerService } from './api/basic-error-controller.service';
import { CategoryControllerService } from './api/category-controller.service';
import { CityControllerService } from './api/city-controller.service';
import { CurrencyControllerService } from './api/currency-controller.service';
import { CustomerControllerService } from './api/customer-controller.service';
import { EmployeeControllerService } from './api/employee-controller.service';
import { InvoiceControllerService } from './api/invoice-controller.service';
import { InvoiceDetailsControllerService } from './api/invoice-details-controller.service';
import { ProductControllerService } from './api/product-controller.service';
import { ProductInvoiceControllerService } from './api/product-invoice-controller.service';
import { StateControllerService } from './api/state-controller.service';
import { TransportTermControllerService } from './api/transport-term-controller.service';
import { UserControllerService } from './api/user-controller.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class ApiModule {
    public static forRoot(configurationFactory: () => ApiConfiguration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: ApiConfiguration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
