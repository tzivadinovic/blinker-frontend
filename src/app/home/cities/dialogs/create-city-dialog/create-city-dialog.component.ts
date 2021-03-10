import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CityControllerService} from '../../../../../openapi';
import {SnackbarService} from '../../../../../utils/snackbar-handler';

@Component({
  selector: 'app-create-city-dialog',
  templateUrl: './create-city-dialog.component.html',
  styleUrls: ['./create-city-dialog.component.css']
})
export class CreateCityDialogComponent implements OnInit {

  form = new FormGroup({
    city: new FormControl(null),
    zipcode: new FormControl(null)
  });

  constructor(public dialog: MatDialog,
              private cityService: CityControllerService,
              private snackBarService: SnackbarService,
              private dialogRef: MatDialogRef<CreateCityDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit(): void {
  }

  createCity() {
    const formValue = this.form;
    if (formValue.valid) {
      this.cityService.saveCity(formValue.value).subscribe(() => {
        this.snackBarService.showSuccessSnackbar('Successfully created city');
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
