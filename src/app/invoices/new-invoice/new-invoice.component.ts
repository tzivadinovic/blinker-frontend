import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {
  Currency,
  CurrencyControllerService,
  Customer,
  CustomerControllerService,
  Employee,
  EmployeeControllerService, Invoice,
  InvoiceControllerService,
  InvoiceDetailsControllerService,
  TransportTerm,
  TransportTermControllerService
} from '../../../openapi';
import {SnackbarService} from '../../../utils/snackbar-handler';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.css']
})
export class NewInvoiceComponent implements OnInit {
  form = new FormGroup({
    number: new FormControl(null),
    customer: new FormControl(null),
    transportTerm: new FormControl(null),
    currency: new FormControl(null),
    paymentConditions: new FormControl(null),
    employee: new FormControl(null),
    totalBoxes: new FormControl(null),
    grossWeight: new FormControl(null),
    netWeight: new FormControl({disabled: true}),
    shippingFees: new FormControl(null),
    date: new FormControl(null)
  });

  invoiceInputs: any[] = [];

  customers: Customer[] = [];
  transportTerms: TransportTerm[] = [];
  currencies: Currency[] = [];
  employees: Employee[] = [];
  invoices: Invoice[] = [];

  constructor(private invoiceService: InvoiceControllerService,
              private snackBarService: SnackbarService,
              private invoiceDetailsService: InvoiceDetailsControllerService,
              private customerService: CustomerControllerService,
              private transportTermsService: TransportTermControllerService,
              private currencyService: CurrencyControllerService,
              private employeeService: EmployeeControllerService) {
  }

  ngOnInit(): void {
    this.getAllInvoices();
    this.form.get('netWeight').disable();
    this.checkForm();
    this.getAllCurrencies();
    this.getAllCustomers();
    this.getAllEmployees();
    this.getAllTransportTerms();
  }

  public checkForm(): void {
    const newInput: any = {};
    this.invoiceInputs.push(newInput);
  }

  createNewInvoice() {
    this.invoiceService.saveInvoice().subscribe(() => {
      this.snackBarService.showSuccessSnackbar('Successfully created invoice');
    }, error => {
      this.snackBarService.showErrorSnackbar(error.error.message);
    });
  }

  saveInvoiceDetails(): void {
    this.invoiceDetailsService.saveInvoiceDetails(this.form.value).subscribe(() => {
      this.snackBarService.showSuccessSnackbar('Successfully saved invoice details');
    });
  }

  getAllCustomers(): void {
    this.customerService.getAllCustomers().subscribe(data => {
      this.customers = data;
    });
  }

  getAllTransportTerms(): void {
    this.transportTermsService.getAllTransportTerms().subscribe(data => {
      this.transportTerms = data;
    });
  }

  getAllCurrencies(): void {
    this.currencyService.getAllCurrencies().subscribe(data => {
      this.currencies = data;
    });
  }

  getAllEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  getAllInvoices(): void {
    this.invoiceService.getAllInvoices().subscribe(data => {
      this.invoices = data;
    });
  }
}
