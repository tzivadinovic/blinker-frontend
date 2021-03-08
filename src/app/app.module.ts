import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatLineModule, MatNativeDateModule} from '@angular/material/core';
import {RouterModule, Routes} from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {HomeComponent} from './home/home.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {FloatsComponent} from './home/floats/floats.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import {InvoicesComponent} from './invoices/invoices.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {ProformaInvoicesComponent} from './proforma-invoices/proforma-invoices.component';
import {PackingListsComponent} from './packing-lists/packing-lists.component';
import {PrintOptionsDialogComponent} from './invoices/dialogs/print-options-dialog/print-options-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {EditInvoiceDialogComponent} from './invoices/dialogs/edit-invoice-dialog/edit-invoice-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {EditProformaInvoiceDialogComponent} from './invoices/dialogs/edit-proforma-invoice-dialog/edit-proforma-invoice-dialog.component';
import {EditPackingListDialogComponent} from './invoices/dialogs/edit-packing-list-dialog/edit-packing-list-dialog.component';
import {CreateProductDialogComponent} from './invoices/dialogs/create-product-dialog/create-product-dialog.component';
import {NewInvoiceComponent} from './invoices/new-invoice/new-invoice.component';
import {NewInvoiceFieldsComponent} from './invoices/new-invoice/new-invoice-fields/new-invoice-fields.component';
import {EditProductDialogComponent} from './invoices/dialogs/edit-product-dialog/edit-product-dialog.component';
import {DeleteProductDialogComponent} from './invoices/dialogs/delete-product-dialog/delete-product-dialog.component';
import {EmployeesComponent} from './home/employees/employees.component';
import {CustomersComponent} from './home/customers/customers.component';
import {StatesComponent} from './home/states/states.component';
import {CitiesComponent} from './home/cities/cities.component';
import {TransportTermsComponent} from './home/transport-terms/transport-terms.component';
import {CurrenciesComponent} from './home/currencies/currencies.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from '../utils/jwt.interceptor';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BASE_PATH} from '../openapi';
import {environment} from '../environments/environment';
import {SnackbarService} from '../utils/snackbar-handler';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {EditEmployeeDialogComponent} from './home/employees/dialogs/edit-employee-dialog/edit-employee-dialog.component';
import {CreateEmployeeDialogComponent} from './home/employees/dialogs/create-employee-dialog/create-employee-dialog.component';
import {CreateCustomerDialogComponent} from './home/customers/dialogs/create-customer-dialog/create-customer-dialog.component';
import {EditCustomerDialogComponent} from './home/customers/dialogs/edit-customer-dialog/edit-customer-dialog.component';
import {CreateStateDialogComponent} from './home/states/dialogs/create-state-dialog/create-state-dialog.component';
import {EditStateDialogComponent} from './home/states/dialogs/edit-state-dialog/edit-state-dialog.component';
import {CreateCityDialogComponent} from './home/cities/dialogs/create-city-dialog/create-city-dialog.component';
import {EditProductInvoiceDialogComponent} from './invoices/dialogs/edit-product-invoice-dialog/edit-product-invoice-dialog.component';
import { CreateTransportTermDialogComponent } from './home/transport-terms/dialogs/create-transport-term-dialog/create-transport-term-dialog.component';
import { EditTransportTermDialogComponent } from './home/transport-terms/dialogs/edit-transport-term-dialog/edit-transport-term-dialog.component';
import { EditCurrencyDialogComponent } from './home/currencies/dialogs/edit-currency-dialog/edit-currency-dialog.component';
import { CreateCurrencyDialogComponent } from './home/currencies/dialogs/create-currency-dialog/create-currency-dialog.component';

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'invoices', component: InvoicesComponent},
  {path: 'proforma-invoices', component: ProformaInvoicesComponent},
  {path: 'packing-lists', component: PackingListsComponent},
  {path: 'new-invoice', component: NewInvoiceComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FloatsComponent,
    InvoicesComponent,
    ProformaInvoicesComponent,
    PackingListsComponent,
    PrintOptionsDialogComponent,
    EditInvoiceDialogComponent,
    EditProformaInvoiceDialogComponent,
    EditPackingListDialogComponent,
    CreateProductDialogComponent,
    NewInvoiceComponent,
    NewInvoiceFieldsComponent,
    EditProductDialogComponent,
    DeleteProductDialogComponent,
    EmployeesComponent,
    CustomersComponent,
    StatesComponent,
    CitiesComponent,
    TransportTermsComponent,
    CurrenciesComponent,
    EditEmployeeDialogComponent,
    CreateEmployeeDialogComponent,
    CreateCustomerDialogComponent,
    EditCustomerDialogComponent,
    CreateStateDialogComponent,
    EditStateDialogComponent,
    CreateCityDialogComponent,
    EditProductInvoiceDialogComponent,
    CreateTransportTermDialogComponent,
    EditTransportTermDialogComponent,
    EditCurrencyDialogComponent,
    CreateCurrencyDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatLineModule,
    RouterModule.forRoot(appRoutes),
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatSnackBarModule,
    MatAutocompleteModule
  ], entryComponents: [
    PrintOptionsDialogComponent,
    EditInvoiceDialogComponent,
    EditPackingListDialogComponent,
    EditProformaInvoiceDialogComponent,
    CreateProductDialogComponent,
    EditProductDialogComponent,
    EditEmployeeDialogComponent,
    CreateEmployeeDialogComponent,
    CreateCustomerDialogComponent,
    EditCustomerDialogComponent,
    CreateStateDialogComponent,
    EditStateDialogComponent,
    CreateCityDialogComponent,
    EditProductInvoiceDialogComponent,
    CreateTransportTermDialogComponent,
    EditTransportTermDialogComponent
  ],
  providers: [
    SnackbarService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: BASE_PATH,
      useValue: environment.apiUrl
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
