import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Employee, EmployeeControllerService} from '../../../../../openapi';
import {SnackbarService} from '../../../../../utils/snackbar-handler';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-employee-dialog',
  templateUrl: './edit-employee-dialog.component.html',
  styleUrls: ['./edit-employee-dialog.component.css']
})
export class EditEmployeeDialogComponent implements OnInit {
  form = new FormGroup({
    firstName: new FormControl(null),
    lastName: new FormControl(null),
    position: new FormControl(null),
    bank: new FormControl(null),
    bankAccount: new FormControl(null),
    phoneNumber: new FormControl(null),
    address: new FormControl(null),
    employmentStartDate: new FormControl(null),
    employmentEndDate: new FormControl(null)
  });

  employee: Employee;
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeControllerService,
              private snackBarService: SnackbarService,
              private dialogRef: MatDialogRef<EditEmployeeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
    this.employee = data;
  }

  ngOnInit(): void {
    this.form.get('firstName').setValue(this.employee.firstName);
    this.form.get('lastName').setValue(this.employee.lastName);
    this.form.get('position').setValue(this.employee.position);
    this.form.get('bank').setValue(this.employee.bank);
    this.form.get('bankAccount').setValue(this.employee.bankAccount);
    this.form.get('phoneNumber').setValue(this.employee.phoneNumber);
    this.form.get('address').setValue(this.employee.address);
    this.form.get('employmentStartDate').setValue(this.employee.employmentStartDate);
    this.form.get('employmentEndDate').setValue(this.employee.employmentEndDate);
  }

  editEmployee() {
    const employee: Employee = this.form.value;
    employee.id = this.data.id;
    if (this.form.valid) {
      this.employeeService.saveEmployee(employee).subscribe(() => {
        this.getAllEmployees();
        this.closeDialog();
        this.snackBarService.showSuccessSnackbar('Successfully edited employee');
      });
    } else {
      this.snackBarService.showErrorSnackbar('Invalid form');
    }
  }

  closeDialog() {
    this.dialogRef.close(true);
  }

  getAllEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(data => {
      this.employees = data;
    });
  }

}
