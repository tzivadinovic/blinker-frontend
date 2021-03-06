import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CreateProductDialogComponent} from '../../invoices/dialogs/create-product-dialog/create-product-dialog.component';
import {EditProductDialogComponent} from '../../invoices/dialogs/edit-product-dialog/edit-product-dialog.component';
import {DeleteProductDialogComponent} from '../../invoices/dialogs/delete-product-dialog/delete-product-dialog.component';

export interface MockData {
  code: string;
  title: string;
  description: string;
  category: string;
  price: number;
}

const elData: MockData[] = [
  {code: '4620010', title: 'Keta', description: 'Test text', category: 'Fishing Float', price: 0.2},
  {code: '4620010', title: 'Keta', description: 'Test text', category: 'Fishing Float', price: 0.2},
  {code: '4620010', title: 'Keta', description: 'Test text', category: 'Fishing Float', price: 0.2},
  {code: '4620010', title: 'Keta', description: 'Test text', category: 'Fishing Float', price: 0.2},
  {code: '4620010', title: 'Keta', description: 'Test text', category: 'Fishing Float', price: 0.2}
];

@Component({
  selector: 'app-transport-terms',
  templateUrl: './transport-terms.component.html',
  styleUrls: ['./transport-terms.component.css']
})
export class TransportTermsComponent implements OnInit {
  displayedColumns: string[] = ['code', 'title', 'description', 'category', 'price', 'options'];
  dataSource = elData;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openCreateProductDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(CreateProductDialogComponent, dialogConfig).afterClosed();
  }

  openEditProductDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(EditProductDialogComponent, dialogConfig).afterClosed();
  }

  openDeleteProductDialog(): void {
    const dialogRef = this.dialog.open(DeleteProductDialogComponent, {
      width: '400px',
      backdropClass: 'background'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result === 'yes') {

        } else if (result === 'no') {
          this.dialog.closeAll();
        }
      }
    });
  }
}
