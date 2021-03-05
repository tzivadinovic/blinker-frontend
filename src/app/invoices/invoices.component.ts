import {Component, OnInit} from '@angular/core';

export interface MockData {
  itemNo: number;
  code: string;
  title: string;
  description: string;
  quantity: number;
  price: number;
}

const elData: MockData[] = [
  {itemNo: 1, code: '4620010', title: 'Keta', description: 'Test text', quantity: 500, price: 0.2},
  {itemNo: 2, code: '4620010', title: 'Keta', description: 'Test text', quantity: 500, price: 0.2},
  {itemNo: 3, code: '4620010', title: 'Keta', description: 'Test text', quantity: 500, price: 0.2},
  {itemNo: 4, code: '4620010', title: 'Keta', description: 'Test text', quantity: 500, price: 0.2},
  {itemNo: 5, code: '4620010', title: 'Keta', description: 'Test text', quantity: 500, price: 0.2},
  {itemNo: 1, code: '4620010', title: 'Keta', description: 'Test text', quantity: 500, price: 0.2},
  {itemNo: 2, code: '4620010', title: 'Keta', description: 'Test text', quantity: 500, price: 0.2},
  {itemNo: 3, code: '4620010', title: 'Keta', description: 'Test text', quantity: 500, price: 0.2},
  {itemNo: 4, code: '4620010', title: 'Keta', description: 'Test text', quantity: 500, price: 0.2},
  {itemNo: 5, code: '4620010', title: 'Keta', description: 'Test text', quantity: 500, price: 0.2},
  {itemNo: 1, code: '4620010', title: 'Keta', description: 'Test text', quantity: 500, price: 0.2},
  {itemNo: 2, code: '4620010', title: 'Keta', description: 'Test text', quantity: 500, price: 0.2},
  {itemNo: 3, code: '4620010', title: 'Keta', description: 'Test text', quantity: 500, price: 0.2},
  {itemNo: 4, code: '4620010', title: 'Keta', description: 'Test text', quantity: 500, price: 0.2},
  {itemNo: 5, code: '4620010', title: 'Keta', description: 'Test text', quantity: 500, price: 0.2},
  {itemNo: 1, code: '4620010', title: 'Keta', description: 'Test text', quantity: 500, price: 0.2},
  {itemNo: 2, code: '4620010', title: 'Keta', description: 'Test text', quantity: 500, price: 0.2},
  {itemNo: 3, code: '4620010', title: 'Keta', description: 'Test text', quantity: 500, price: 0.2},
  {itemNo: 4, code: '4620010', title: 'Keta', description: 'Test text', quantity: 500, price: 0.2},
  {itemNo: 5, code: '4620010', title: 'Keta', description: 'Test text', quantity: 500, price: 0.2}
];

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  panelOpenState = false;
  displayedColumns: string[] = ['itemNo', 'code', 'title', 'description', 'quantity', 'price', 'options'];
  dataSource = elData;

  constructor() {
  }

  ngOnInit(): void {
  }

}
