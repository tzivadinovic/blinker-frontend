import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {EditInvoiceDialogComponent} from '../../invoices/dialogs/edit-invoice-dialog/edit-invoice-dialog.component';
import {CreateProductDialogComponent} from '../../invoices/dialogs/create-product-dialog/create-product-dialog.component';

export interface MockData {
  code: string;
  title: string;
  description: string;
  price: number;
}

const elData: MockData[] = [
  {code: '4620010', title: 'Keta', description: 'Test text', price: 0.2},
  {code: '4620010', title: 'Keta', description: 'Test text', price: 0.2},
  {code: '4620010', title: 'Keta', description: 'Test text', price: 0.2},
  {code: '4620010', title: 'Keta', description: 'Test text', price: 0.2},
  {code: '4620010', title: 'Keta', description: 'Test text', price: 0.2}
];

@Component({
  selector: 'app-floats',
  templateUrl: './floats.component.html',
  styleUrls: ['./floats.component.css']
})
export class FloatsComponent implements OnInit {
  displayedColumns: string[] = ['code', 'title', 'description', 'price', 'options'];
  dataSource = elData;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openCreateProductDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(CreateProductDialogComponent, dialogConfig).afterClosed();
  }
}
