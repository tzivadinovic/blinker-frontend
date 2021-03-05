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
import { ProformaInvoicesComponent } from './proforma-invoices/proforma-invoices.component';
import { PackingListsComponent } from './packing-lists/packing-lists.component';
import { PrintOptionsDialogComponent } from './invoices/dialogs/print-options-dialog/print-options-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { EditInvoiceDialogComponent } from './invoices/dialogs/edit-invoice-dialog/edit-invoice-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { EditProformaInvoiceDialogComponent } from './invoices/dialogs/edit-proforma-invoice-dialog/edit-proforma-invoice-dialog.component';
import { EditPackingListDialogComponent } from './invoices/dialogs/edit-packing-list-dialog/edit-packing-list-dialog.component';
import { CreateProductDialogComponent } from './invoices/dialogs/create-product-dialog/create-product-dialog.component';

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'invoices', component: InvoicesComponent},
  {path: 'proforma-invoices', component: ProformaInvoicesComponent},
  {path: 'packing-lists', component: PackingListsComponent}
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
    MatNativeDateModule
  ], entryComponents: [
    PrintOptionsDialogComponent,
    EditInvoiceDialogComponent,
    EditPackingListDialogComponent,
    EditProformaInvoiceDialogComponent,
    CreateProductDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
