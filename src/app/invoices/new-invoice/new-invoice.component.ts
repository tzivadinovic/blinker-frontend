import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Invoice, InvoiceControllerService} from '../../../openapi';
import {SnackbarService} from '../../../utils/snackbar-handler';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.css']
})
export class NewInvoiceComponent implements OnInit {
  form = new FormGroup({
    invoiceNumber: new FormControl(null),
    customer: new FormControl(null),
    state: new FormControl(null),
    city: new FormControl(null),
    transportTerms: new FormControl(null),
    currency: new FormControl(null),
    paymentConditions: new FormControl(null),
    stampSignature: new FormControl(null),
    totalBoxes: new FormControl(null),
    grossWeight: new FormControl(null),
    netWeight: new FormControl(null),
    shippingFees: new FormControl(null),
    date: new FormControl(null)
  });
  invoiceInputs: any[] = [];
  invoice: Invoice = null;

  constructor(private invoiceService: InvoiceControllerService,
              private snackBarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.form.get('netWeight').disable();
    this.checkForm();
  }

  public checkForm(): void {
    const newInput: any = {};
    this.invoiceInputs.push(newInput);
  }

  createNewInvoice() {
      this.invoiceService.saveInvoice(this.invoice).subscribe(() => {
        this.snackBarService.showSuccessSnackbar('Successfully created invoice');
      }, error => {
        this.snackBarService.showErrorSnackbar(error.error.message);
      });
  }
}
