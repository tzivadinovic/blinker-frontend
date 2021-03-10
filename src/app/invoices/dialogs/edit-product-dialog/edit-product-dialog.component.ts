import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Category, CategoryControllerService, Product, ProductControllerService} from '../../../../openapi';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SnackbarService} from '../../../../utils/snackbar-handler';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.css']
})
export class EditProductDialogComponent implements OnInit {
  form = new FormGroup({
    code: new FormControl(null),
    unit: new FormControl(null),
    description: new FormControl(null),
    category: new FormControl(),
    price: new FormControl(null),
    stock: new FormControl(null)
  });

  categories: Category[] = [];
  products: Product[] = [];
  product: Product;
  category: Category;

  constructor(private categoryService: CategoryControllerService,
              private productService: ProductControllerService,
              private dialogRef: MatDialogRef<EditProductDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private snackBarService: SnackbarService) {
    this.product = data;
  }

  closeDialog() {
    this.dialogRef.close(true);
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.form.get('code').setValue(this.product.code);
    this.form.get('unit').setValue(this.product.unit);
    this.form.get('description').setValue(this.product.description);
    this.form.get('category').setValue(this.product.category);
    this.form.get('price').setValue(this.product.price);
    this.form.get('stock').setValue(this.product.stock);
  }

  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
    });
  }

  editProduct(): void {
    const product: Product = this.form.value;
    product.id = this.data.id;
    if (this.form.valid) {
      this.productService.saveProduct(product).subscribe(() => {
        this.getAllProducts();
        this.closeDialog();
        this.snackBarService.showSuccessSnackbar('Successfully edited product');
      });
    } else {
      this.snackBarService.showErrorSnackbar('Invalid form');
    }
  }

  compareCategory(category1: Category, category2: Category): boolean {
    if (!category1 || !category2) {
      return false;
    }
    return category1.id === category2.id;
  }
}
