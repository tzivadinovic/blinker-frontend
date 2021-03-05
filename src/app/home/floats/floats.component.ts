import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
