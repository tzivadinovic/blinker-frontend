import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {PrintOptionsDialogComponent} from './dialogs/print-options-dialog/print-options-dialog.component';
import {EditInvoiceDialogComponent} from './dialogs/edit-invoice-dialog/edit-invoice-dialog.component';

export interface MockData {
  itemNo: number;
  code: string;
  title: string;
  description: string;
  unit: string;
  quantity: number;
  price: number;
  totalValue: number;
}

const elData: MockData[] = [
  {itemNo: 1, code: '4620010', title: 'Keta', description: 'Test text', unit: 'pc', quantity: 500, price: 0.2, totalValue: 180.00},
  {itemNo: 1, code: '4620010', title: 'Keta', description: 'Test text', unit: 'pc', quantity: 500, price: 0.2, totalValue: 180.00},
  {itemNo: 1, code: '4620010', title: 'Keta', description: 'Test text', unit: 'pc', quantity: 500, price: 0.2, totalValue: 180.00},
  {itemNo: 1, code: '4620010', title: 'Keta', description: 'Test text', unit: 'pc', quantity: 500, price: 0.2, totalValue: 180.00},
  {itemNo: 1, code: '4620010', title: 'Keta', description: 'Test text', unit: 'pc', quantity: 500, price: 0.2, totalValue: 180.00},
  {itemNo: 1, code: '4620010', title: 'Keta', description: 'Test text', unit: 'pc', quantity: 500, price: 0.2, totalValue: 180.00},
  {itemNo: 1, code: '4620010', title: 'Keta', description: 'Test text', unit: 'pc', quantity: 500, price: 0.2, totalValue: 180.00},
  {itemNo: 1, code: '4620010', title: 'Keta', description: 'Test text', unit: 'pc', quantity: 500, price: 0.2, totalValue: 180.00},
  {itemNo: 1, code: '4620010', title: 'Keta', description: 'Test text', unit: 'pc', quantity: 500, price: 0.2, totalValue: 180.00},
  {itemNo: 1, code: '4620010', title: 'Keta', description: 'Test text', unit: 'pc', quantity: 500, price: 0.2, totalValue: 180.00},
  {itemNo: 1, code: '4620010', title: 'Keta', description: 'Test text', unit: 'pc', quantity: 500, price: 0.2, totalValue: 180.00},
  {itemNo: 1, code: '4620010', title: 'Keta', description: 'Test text', unit: 'pc', quantity: 500, price: 0.2, totalValue: 180.00},
  {itemNo: 1, code: '4620010', title: 'Keta', description: 'Test text', unit: 'pc', quantity: 500, price: 0.2, totalValue: 180.00},
  {itemNo: 1, code: '4620010', title: 'Keta', description: 'Test text', unit: 'pc', quantity: 500, price: 0.2, totalValue: 180.00},
  {itemNo: 1, code: '4620010', title: 'Keta', description: 'Test text', unit: 'pc', quantity: 500, price: 0.2, totalValue: 180.00},
  {itemNo: 1, code: '4620010', title: 'Keta', description: 'Test text', unit: 'pc', quantity: 500, price: 0.2, totalValue: 180.00},
  {itemNo: 1, code: '4620010', title: 'Keta', description: 'Test text', unit: 'pc', quantity: 500, price: 0.2, totalValue: 180.00},
  {itemNo: 1, code: '4620010', title: 'Keta', description: 'Test text', unit: 'pc', quantity: 500, price: 0.2, totalValue: 180.00},
  {itemNo: 1, code: '4620010', title: 'Keta', description: 'Test text', unit: 'pc', quantity: 500, price: 0.2, totalValue: 180.00},
  {itemNo: 1, code: '4620010', title: 'Keta', description: 'Test text', unit: 'pc', quantity: 500, price: 0.2, totalValue: 180.00},
  {itemNo: 1, code: '4620010', title: 'Keta', description: 'Test text', unit: 'pc', quantity: 500, price: 0.2, totalValue: 180.00}
];

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  panelOpenState = false;
  displayedColumns: string[] = ['itemNo', 'code', 'title', 'description', 'unit', 'quantity', 'price', 'totalValue', 'options'];
  dataSource = elData;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openPrintOptionsDialog(): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(PrintOptionsDialogComponent, dialogConfig).afterClosed();
  }

  openEditInvoiceDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(EditInvoiceDialogComponent, dialogConfig).afterClosed();
  }
}