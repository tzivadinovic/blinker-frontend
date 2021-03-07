import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SnackbarService} from '../../../../../utils/snackbar-handler';
import {
  Category,
  City,
  CityControllerService,
  Customer,
  CustomerControllerService,
  Product,
  State,
  StateControllerService
} from '../../../../../openapi';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-customer-dialog',
  templateUrl: './edit-customer-dialog.component.html',
  styleUrls: ['./edit-customer-dialog.component.css']
})
export class EditCustomerDialogComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl(null),
    state: new FormControl(null),
    city: new FormControl(null)
  });
  states: State[] = [];
  cities: City[] = [];
  customer: Customer;
  customers: Customer[] = [];

  constructor(private dialogRef: MatDialogRef<EditCustomerDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private snackBarService: SnackbarService,
              private stateService: StateControllerService,
              private cityService: CityControllerService,
              private customerService: CustomerControllerService) {
    this.customer = data;
  }

  ngOnInit(): void {
    this.getAllCities();
    this.getAllStates();
    this.form.get('name').setValue(this.customer.name);
    this.form.get('state').setValue(this.customer.state);
    this.form.get('city').setValue(this.customer.city);
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

  getAllCustomers(): void {
    this.customerService.getAllCustomers().subscribe(data => {
      this.customers = data;
    });
  }

  editCustomer() {
    const customer: Customer = this.form.value;
    customer.id = this.data.id;
    if (this.form.valid) {
      this.customerService.saveCustomer(customer).subscribe(() => {
        this.getAllCustomers();
        this.closeDialog();
        this.snackBarService.showSuccessSnackbar('Successfully edited customer');
      });
    } else {
      this.snackBarService.showErrorSnackbar('Invalid form');
    }
  }

  closeDialog() {
    this.dialogRef.close(true);
  }

  compareState(state1: State, state2: State): boolean {
    if (!state1 || !state2) {
      return false;
    }
    return state1.id === state2.id;
  }

  compareCity(city1: City, city2: City): boolean {
    if (!city1 || !city2) {
      return false;
    }
    return city1.id === city2.id;
  }
}
