import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Category, CategoryControllerService, Product, ProductControllerService} from '../../../../openapi';
import {SnackbarService} from '../../../../utils/snackbar-handler';

@Component({
  selector: 'app-create-product-dialog',
  templateUrl: './create-product-dialog.component.html',
  styleUrls: ['./create-product-dialog.component.css']
})
export class CreateProductDialogComponent implements OnInit {
  form = new FormGroup({
    code: new FormControl(null),
    name: new FormControl(null),
    description: new FormControl(null),
    category: new FormControl(null),
    price: new FormControl(null),
    stock: new FormControl(null)
  });

  categories: Category[] = [];
  products: Product[] = [];

  constructor(private dialogRef: MatDialogRef<CreateProductDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private categoryService: CategoryControllerService,
              private productService: ProductControllerService,
              private snackBarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  closeDialog() {
    this.dialogRef.close(true);
  }

  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  createProduct(): void {
    const formValue = this.form;
    if (formValue.valid) {
      this.productService.saveProduct(formValue.value).subscribe(() => {
        this.snackBarService.showSuccessSnackbar('Successfully created product');
        this.closeDialog();
      });
    } else {
      this.snackBarService.showErrorSnackbar('Invalid form');
    }

  }

}
