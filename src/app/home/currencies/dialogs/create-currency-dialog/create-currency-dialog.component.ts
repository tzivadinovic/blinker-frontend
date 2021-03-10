import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CurrencyControllerService} from '../../../../../openapi';
import {SnackbarService} from '../../../../../utils/snackbar-handler';

@Component({
  selector: 'app-create-currency-dialog',
  templateUrl: './create-currency-dialog.component.html',
  styleUrls: ['./create-currency-dialog.component.css']
})
export class CreateCurrencyDialogComponent implements OnInit {
  form = new FormGroup({
    currency: new FormControl(null)
  });

  constructor(public dialog: MatDialog,
              private currencyService: CurrencyControllerService,
              private snackBarService: SnackbarService,
              private dialogRef: MatDialogRef<CreateCurrencyDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit(): void {
  }

  createCurrency() {
    const formValue = this.form;
    console.log(formValue.value);
    if (formValue.valid) {
      this.currencyService.saveCurrency(formValue.value).subscribe(() => {
        this.snackBarService.showSuccessSnackbar('Successfully created currency');
        this.closeDialog();
      });
    } else {
      this.snackBarService.showErrorSnackbar('Invalid form');
    }
  }

  closeDialog() {
    this.dialogRef.close(true);
  }
}
