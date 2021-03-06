import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.css']
})
export class EditProductDialogComponent implements OnInit {
  form = new FormGroup({
    code: new FormControl(null),
    title: new FormControl(null),
    description: new FormControl(null),
    category: new FormControl(null),
    price: new FormControl(null)
  });
  constructor() { }

  ngOnInit(): void {
  }

}
