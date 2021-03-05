import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-create-product-dialog',
  templateUrl: './create-product-dialog.component.html',
  styleUrls: ['./create-product-dialog.component.css']
})
export class CreateProductDialogComponent implements OnInit {
  form = new FormGroup({
    code: new FormControl(null),
    title: new FormControl(null),
    description: new FormControl(null),
    price: new FormControl(null)
  });
  constructor() { }

  ngOnInit(): void {
  }

}
