import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {TransportTerm, TransportTermControllerService} from '../../../../../openapi';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SnackbarService} from '../../../../../utils/snackbar-handler';

@Component({
  selector: 'app-edit-transport-term-dialog',
  templateUrl: './edit-transport-term-dialog.component.html',
  styleUrls: ['./edit-transport-term-dialog.component.css']
})
export class EditTransportTermDialogComponent implements OnInit {
  form = new FormGroup({
    term: new FormControl(null)
  });

  transportTerm: TransportTerm;
  transportTerms: TransportTerm[] = [];

  constructor(private dialogRef: MatDialogRef<EditTransportTermDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private snackBarService: SnackbarService,
              private transportTermService: TransportTermControllerService) {
    this.transportTerm = data;
  }

  ngOnInit(): void {
    this.form.get('term').setValue(this.transportTerm.term);
  }

  editTransportTerm() {
    const transportTerm: TransportTerm = this.form.value;
    transportTerm.id = this.data.id;
    if (this.form.valid) {
      this.transportTermService.saveTransportTerm(transportTerm).subscribe(() => {
        this.getAllTransportTerms();
        this.closeDialog();
        this.snackBarService.showSuccessSnackbar('Successfully edited transport term');
      });
    } else {
      this.snackBarService.showErrorSnackbar('Invalid form');
    }
  }

  getAllTransportTerms(): void {
    this.transportTermService.getAllTransportTerms().subscribe(data => {
      this.transportTerms = data;
    });
  }

  closeDialog() {
    this.dialogRef.close(true);
  }
}
