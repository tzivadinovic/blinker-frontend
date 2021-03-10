import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {EmployeeControllerService} from '../../../../../openapi';
import {SnackbarService} from '../../../../../utils/snackbar-handler';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-employee-dialog',
  templateUrl: './create-employee-dialog.component.html',
  styleUrls: ['./create-employee-dialog.component.css']
})
export class CreateEmployeeDialogComponent implements OnInit {
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

  constructor(private employeeService: EmployeeControllerService,
              private snackBarService: SnackbarService,
              private dialogRef: MatDialogRef<CreateEmployeeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit(): void {
  }

  createEmployee() {
    const formValue = this.form;
    if (formValue.valid) {
      this.employeeService.saveEmployee(formValue.value).subscribe(() => {
        this.snackBarService.showSuccessSnackbar('Successfully created employee');
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
