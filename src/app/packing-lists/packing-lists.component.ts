import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {EditPackingListDialogComponent} from '../invoices/dialogs/edit-packing-list-dialog/edit-packing-list-dialog.component';

export interface MockPackingList {
  itemNo: number;
  code: string;
  title: string;
  description: string;
  unit: string;
  quantity: number;
  price: number;
  totalValue: number;
}

const elData: MockPackingList[] = [
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
  selector: 'app-packing-lists',
  templateUrl: './packing-lists.component.html',
  styleUrls: ['./packing-lists.component.css']
})
export class PackingListsComponent implements OnInit {
  panelOpenState = false;
  displayedColumns: string[] = ['itemNo', 'code', 'title', 'description', 'unit', 'quantity', 'price', 'totalValue', 'options'];
  dataSource = elData;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openEditPackingListDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(EditPackingListDialogComponent, dialogConfig).afterClosed();
  }
}
