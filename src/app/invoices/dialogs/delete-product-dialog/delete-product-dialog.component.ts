import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-product-dialog',
  templateUrl: './delete-product-dialog.component.html',
  styleUrls: ['./delete-product-dialog.component.css']
})
export class DeleteProductDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteProductDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

}
