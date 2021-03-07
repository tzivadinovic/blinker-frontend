import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Customer, CustomerControllerService, State, StateControllerService} from '../../../../../openapi';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SnackbarService} from '../../../../../utils/snackbar-handler';

@Component({
  selector: 'app-edit-state-dialog',
  templateUrl: './edit-state-dialog.component.html',
  styleUrls: ['./edit-state-dialog.component.css']
})
export class EditStateDialogComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl(null)
  });

  state: State;
  states: State[] = [];

  constructor(private dialogRef: MatDialogRef<EditStateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private stateService: StateControllerService,
              private snackBarService: SnackbarService) {
    this.state = data;
  }

  ngOnInit(): void {
    this.form.get('name').setValue(this.state.name);
  }

  editState() {
    const state: State = this.form.value;
    state.id = this.data.id;
    if (this.form.valid) {
      this.stateService.saveState(state).subscribe(() => {
        this.getAllStates();
        this.closeDialog();
        this.snackBarService.showSuccessSnackbar('Successfully edited state');
      });
    } else {
      this.snackBarService.showErrorSnackbar('Invalid form');
    }
  }

  getAllStates(): void {
    this.stateService.getAllStates().subscribe(data => {
      this.states = data;
    });
  }

  closeDialog() {
    this.dialogRef.close(true);
  }
}
