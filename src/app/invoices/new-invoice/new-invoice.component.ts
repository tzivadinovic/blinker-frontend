import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

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

  constructor() {
  }

  ngOnInit(): void {
    this.form.get('netWeight').disable();
    this.checkForm();
  }

  public checkForm(): void {
    const newInput: any = {};
    this.invoiceInputs.push(newInput);
  }

}
