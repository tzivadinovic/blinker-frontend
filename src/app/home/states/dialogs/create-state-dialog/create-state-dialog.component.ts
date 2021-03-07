import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {StateControllerService} from '../../../../../openapi';
import {SnackbarService} from '../../../../../utils/snackbar-handler';

@Component({
  selector: 'app-create-state-dialog',
  templateUrl: './create-state-dialog.component.html',
  styleUrls: ['./create-state-dialog.component.css']
})
export class CreateStateDialogComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl(null)
  });

  constructor(public dialog: MatDialog,
              private stateService: StateControllerService,
              private snackBarService: SnackbarService,
              private dialogRef: MatDialogRef<CreateStateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

  createState() {
    const formValue = this.form;
    if (formValue.valid) {
      this.stateService.saveState(formValue.value).subscribe(() => {
        this.snackBarService.showSuccessSnackbar('Successfully created state');
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
