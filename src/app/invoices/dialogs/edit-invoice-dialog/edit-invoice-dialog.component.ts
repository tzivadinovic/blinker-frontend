import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {
  CityControllerService,
  Currency,
  CurrencyControllerService,
  Customer,
  CustomerControllerService,
  Employee,
  EmployeeControllerService,
  InvoiceDetails,
  InvoiceDetailsControllerService,
  StateControllerService,
  TransportTerm,
  TransportTermControllerService
} from '../../../../openapi';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SnackbarService} from '../../../../utils/snackbar-handler';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-edit-invoice-dialog',
  templateUrl: './edit-invoice-dialog.component.html',
  styleUrls: ['./edit-invoice-dialog.component.css']
})
export class EditInvoiceDialogComponent implements OnInit {
  form = new FormGroup({
    number: new FormControl(null),
    customer: new FormControl(null),
    transportTerm: new FormControl(null),
    currency: new FormControl(null),
    paymentConditions: new FormControl(null),
    employee: new FormControl(null),
    totalBoxes: new FormControl(null),
    grossWeight: new FormControl(null),
    shippingFees: new FormControl(null),
    date: new FormControl(null),
    deliveryDate: new FormControl(null),
    remarks: new FormControl(null),
    attn: new FormControl(null),
    itemsInfo: new FormControl(null),
    boxesInfo: new FormControl(null)
  });

  customers: Customer[] = [];
  employees: Employee[] = [];
  currencies: Currency[] = [];
  transportTerms: TransportTerm[] = [];
  invoiceDetails: InvoiceDetails;


  constructor(private dialogRef: MatDialogRef<EditInvoiceDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private snackBarService: SnackbarService,
              private stateService: StateControllerService,
              private cityService: CityControllerService,
              private customerService: CustomerControllerService,
              private employeeService: EmployeeControllerService,
              private currencyService: CurrencyControllerService,
              private transportTermService: TransportTermControllerService,
              private invoiceDetailsService: InvoiceDetailsControllerService) {
    this.invoiceDetails = data;
  }

  ngOnInit(): void {
    this.getAllEmployees();
    this.getAllCurrencies();
    this.getAllTransportTerms();
    this.getAllCustomers();
    this.form.get('number').setValue(this.invoiceDetails?.number);
    this.form.get('customer').setValue(this.invoiceDetails?.customer);
    this.form.get('transportTerm').setValue(this.invoiceDetails?.transportTerm);
    this.form.get('currency').setValue(this.invoiceDetails?.currency);
    this.form.get('paymentConditions').setValue(this.invoiceDetails?.paymentConditions);
    this.form.get('employee').setValue(this.invoiceDetails?.employee);
    this.form.get('totalBoxes').setValue(this.invoiceDetails?.totalBoxes);
    this.form.get('grossWeight').setValue(this.invoiceDetails?.grossWeight);
    this.form.get('shippingFees').setValue(this.invoiceDetails?.shippingFees);
    this.form.get('date').setValue(this.invoiceDetails?.date);
    this.form.get('deliveryDate').setValue(this.invoiceDetails?.deliveryDate);
    this.form.get('remarks').setValue(this.invoiceDetails?.remarks);
    this.form.get('attn').setValue(this.invoiceDetails?.attn);
    this.form.get('itemsInfo').setValue(this.invoiceDetails?.itemsInfo);
    this.form.get('boxesInfo').setValue(this.invoiceDetails?.boxesInfo);
  }

  getInvoiceDetailsById(id: number) {
    this.invoiceDetailsService.getInvoiceDetailsById(id).subscribe(data => {
      this.invoiceDetails = data;
    });
  }

  getAllEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  getAllCurrencies(): void {
    this.currencyService.getAllCurrencies().subscribe(data => {
      this.currencies = data;
    });
  }

  getAllTransportTerms(): void {
    this.transportTermService.getAllTransportTerms().subscribe(data => {
      this.transportTerms = data;
    });
  }

  getAllCustomers(): void {
    this.customerService.getAllCustomers().subscribe(data => {
      this.customers = data;
    });
  }

  compareEmployee(employee1: Employee, employee2: Employee): boolean {
    if (!employee1 || !employee2) {
      return false;
    }
    return employee1.id === employee2.id;
  }

  compareCurrency(currency1: Currency, currency2: Currency): boolean {
    if (!currency1 || !currency2) {
      return false;
    }
    return currency1.id === currency2.id;
  }

  compareTransportTerm(transportTerm1: TransportTerm, transportTerm2: TransportTerm): boolean {
    if (!transportTerm1 || !transportTerm2) {
      return false;
    }
    return transportTerm1.id === transportTerm2.id;
  }

  compareCustomer(customer1: Customer, customer2: Customer): boolean {
    if (!customer1 || !customer2) {
      return false;
    }
    return customer1.id === customer2.id;
  }

  editInvoiceDetails() {
    const invoiceDetails: InvoiceDetails = this.form.value;
    invoiceDetails.id = this.data.id;
    invoiceDetails.totalPrice = this.data.totalPrice;
    // invoiceDetails.invoice = this.data.invoice;
    if (this.form.valid) {
      this.invoiceDetailsService.updateInvoiceDetails(invoiceDetails).subscribe(() => {
        this.closeDialog();
        this.getInvoiceDetailsById(invoiceDetails.id);
        this.snackBarService.showSuccessSnackbar('Successfully edited invoice details');
      });
    } else {
      this.snackBarService.showErrorSnackbar('Invalid form');
    }
  }

  closeDialog() {
    this.dialogRef.close(true);
  }
}
