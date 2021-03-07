import {Component, Inject, OnInit} from '@angular/core';
import {City, CityControllerService, CustomerControllerService, State, StateControllerService} from '../../../../../openapi';
import {FormControl, FormGroup} from '@angular/forms';
import {SnackbarService} from '../../../../../utils/snackbar-handler';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-customer-dialog',
  templateUrl: './create-customer-dialog.component.html',
  styleUrls: ['./create-customer-dialog.component.css']
})
export class CreateCustomerDialogComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl(null),
    state: new FormControl(null),
    city: new FormControl(null)
  });
  states: State[] = [];
  cities: City[] = [];

  constructor(private stateService: StateControllerService,
              private cityService: CityControllerService,
              private customerService: CustomerControllerService,
              private snackBarService: SnackbarService,
              private dialogRef: MatDialogRef<CreateCustomerDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.getAllCities();
    this.getAllStates();
  }

  getAllStates(): void {
    this.stateService.getAllStates().subscribe(data => {
      this.states = data;
    });
  }

  getAllCities(): void {
    this.cityService.getAllCities().subscribe(data => {
      this.cities = data;
    });
  }

  createCustomer() {
    const formValue = this.form;
    if (formValue.valid) {
      this.customerService.saveCustomer(formValue.value).subscribe(() => {
        this.snackBarService.showSuccessSnackbar('Successfully created customer');
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
