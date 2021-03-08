import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Currency, CurrencyControllerService} from '../../../../../openapi';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SnackbarService} from '../../../../../utils/snackbar-handler';

@Component({
  selector: 'app-edit-currency-dialog',
  templateUrl: './edit-currency-dialog.component.html',
  styleUrls: ['./edit-currency-dialog.component.css']
})
export class EditCurrencyDialogComponent implements OnInit {
  form = new FormGroup({
    currency: new FormControl(null)
  });

  currency: Currency;
  currencies: Currency[] = [];

  constructor(private dialogRef: MatDialogRef<EditCurrencyDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private currencyService: CurrencyControllerService,
              private snackBarService: SnackbarService) {
    this.currency = data;
  }

  ngOnInit(): void {
    this.form.get('currency').setValue(this.currency.currency);
  }

  editCurrency() {
    const currency: Currency = this.form.value;
    currency.id = this.data.id;
    if (this.form.valid) {
      this.currencyService.saveCurrency(currency).subscribe(() => {
        this.getAllCurrencies();
        this.closeDialog();
        this.snackBarService.showSuccessSnackbar('Successfully edited currency');
      });
    } else {
      this.snackBarService.showErrorSnackbar('Invalid form');
    }
  }

  getAllCurrencies(): void {
    this.currencyService.getAllCurrencies().subscribe(data => {
      this.currencies = data;
    });
  }

  closeDialog() {
    this.dialogRef.close(true);
  }

}
