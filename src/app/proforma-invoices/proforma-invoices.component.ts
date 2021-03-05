import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {EditInvoiceDialogComponent} from '../invoices/dialogs/edit-invoice-dialog/edit-invoice-dialog.component';
import {EditProformaInvoiceDialogComponent} from '../invoices/dialogs/edit-proforma-invoice-dialog/edit-proforma-invoice-dialog.component';

export interface MockProforma {
  itemNo: number;
  code: string;
  title: string;
  description: string;
  unit: string;
  quantity: number;
  price: number;
  totalValue: number;
}

const elData: MockProforma[] = [
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
  selector: 'app-proforma-invoices',
  templateUrl: './proforma-invoices.component.html',
  styleUrls: ['./proforma-invoices.component.css']
})
export class ProformaInvoicesComponent implements OnInit {
  panelOpenState = false;
  displayedColumns: string[] = ['itemNo', 'code', 'title', 'description', 'unit', 'quantity', 'price', 'totalValue', 'options'];
  dataSource = elData;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openEditProformaInvoiceDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(EditProformaInvoiceDialogComponent, dialogConfig).afterClosed();
  }
}
