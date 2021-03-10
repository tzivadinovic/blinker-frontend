import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-print-options-dialog',
  templateUrl: './print-options-dialog.component.html',
  styleUrls: ['./print-options-dialog.component.css']
})
export class PrintOptionsDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<PrintOptionsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close(true);
  }

}
