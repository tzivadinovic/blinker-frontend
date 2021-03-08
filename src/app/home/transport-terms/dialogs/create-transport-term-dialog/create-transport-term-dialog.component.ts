import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {StateControllerService, TransportTermControllerService} from '../../../../../openapi';
import {SnackbarService} from '../../../../../utils/snackbar-handler';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-create-transport-term-dialog',
  templateUrl: './create-transport-term-dialog.component.html',
  styleUrls: ['./create-transport-term-dialog.component.css']
})
export class CreateTransportTermDialogComponent implements OnInit {
  form = new FormGroup({
    term: new FormControl(null)
  });
  constructor(public dialog: MatDialog,
              private transportTermService: TransportTermControllerService,
              private snackBarService: SnackbarService,
              private dialogRef: MatDialogRef<CreateTransportTermDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

  createTransportTerm() {
    const formValue = this.form;
    console.log(formValue.value);
    if (formValue.valid) {
      this.transportTermService.saveTransportTerm(formValue.value).subscribe(() => {
        this.snackBarService.showSuccessSnackbar('Successfully created transport term');
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
