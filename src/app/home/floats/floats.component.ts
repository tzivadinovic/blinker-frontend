import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {EditProductDialogComponent} from '../../invoices/dialogs/edit-product-dialog/edit-product-dialog.component';
import {DeleteProductDialogComponent} from '../../invoices/dialogs/delete-product-dialog/delete-product-dialog.component';
import {MatTableDataSource} from '@angular/material/table';
import {Product, ProductControllerService} from '../../../openapi';
import {MatPaginator} from '@angular/material/paginator';
import {CreateProductDialogComponent} from '../../invoices/dialogs/create-product-dialog/create-product-dialog.component';
import {SnackbarService} from '../../../utils/snackbar-handler';
import {filterProduct} from '../../../utils/filter';

@Component({
  selector: 'app-floats',
  templateUrl: './floats.component.html',
  styleUrls: ['./floats.component.css']
})
export class FloatsComponent implements OnInit, AfterViewInit {
  products: Product[] = [];
  displayedColumns: string[] = ['code', 'title', 'description', 'category', 'price', 'options'];
  dataSource = new MatTableDataSource<Product>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(public dialog: MatDialog,
              private productService: ProductControllerService,
              private snackBarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  openCreateProductDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(CreateProductDialogComponent, dialogConfig).afterClosed().subscribe(() => {
      this.getAllProducts();
    });
  }

  openEditProductDialog(product: Product): void {
    const dialogConfig = this.dialog.open(EditProductDialogComponent, {
      width: '500px',
      data: product
    });
    dialogConfig.afterClosed().subscribe(() => {
      this.getAllProducts();
    });
  }

  openDeleteProductDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteProductDialogComponent, {
      width: '400px',
      backdropClass: 'background'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result === 'yes') {
          this.productService.deleteProductById(id).subscribe(() => {
            this.snackBarService.showSuccessSnackbar('Successfully deleted product');
            this.getAllProducts();
          }, error => {
            this.snackBarService.showErrorSnackbar(error.error.message);
          });
        } else if (result === 'no') {
          this.dialog.closeAll();
        }
      }
    });
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
      this.dataSource.data = this.products;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  searchProduct(inputPar: string) {
    if (inputPar) {
      this.dataSource.data = this.products.filter(item => filterProduct(item, inputPar));
    } else {
      this.dataSource.data = this.products;
    }
  }
}
