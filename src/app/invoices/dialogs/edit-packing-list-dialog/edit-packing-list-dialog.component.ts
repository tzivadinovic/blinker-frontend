import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-packing-list-dialog',
  templateUrl: './edit-packing-list-dialog.component.html',
  styleUrls: ['./edit-packing-list-dialog.component.css']
})
export class EditPackingListDialogComponent implements OnInit {
  form = new FormGroup({
    invoiceNumber: new FormControl(null),
    customer: new FormControl(null),
    state: new FormControl(null),
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

  constructor() {
  }

  ngOnInit(): void {
  }

}
