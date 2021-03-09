import {Component, Inject, OnInit} from '@angular/core';
import {
  Customer,
  InvoiceDetails,
  Product,
  ProductControllerService,
  ProductInvoice,
  ProductInvoiceControllerService
} from '../../../../openapi';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SnackbarService} from '../../../../utils/snackbar-handler';

@Component({
  selector: 'app-edit-product-invoice-dialog',
  templateUrl: './edit-product-invoice-dialog.component.html',
  styleUrls: ['./edit-product-invoice-dialog.component.css']
})
export class EditProductInvoiceDialogComponent implements OnInit {
  form = new FormGroup({
    itemNumber: new FormControl(null),
    product: new FormControl(null),
    unit: new FormControl(),
    quantity: new FormControl(null)
  });

  productInvoice: ProductInvoice;
  products: Product[] = [];
  productInvoices: ProductInvoice[] = [];

  constructor(private dialogRef: MatDialogRef<EditProductInvoiceDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private snackBarService: SnackbarService,
              private productInvoiceService: ProductInvoiceControllerService,
              private productService: ProductControllerService) {
    this.productInvoice = data;
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.form.get('itemNumber').setValue(this.productInvoice.itemNumber);
    this.form.get('product').setValue(this.productInvoice.product);
    this.form.get('quantity').setValue(this.productInvoice.quantity);
  }

  editRecord() {
    const productInvoice: ProductInvoice = this.form.value;
    productInvoice.id = this.data.id;
    productInvoice.invoice = this.data.invoice;
    if (this.form.valid) {
      this.productInvoiceService.updateProductInvoice(productInvoice).subscribe(() => {
        this.closeDialog();
        this.snackBarService.showSuccessSnackbar('Successfully edited record');
        this.getAllProductInvoice();
      });
    } else {
      this.snackBarService.showErrorSnackbar('Invalid form');
    }
  }

  getAllProductInvoice(): void {
    this.productInvoiceService.findByInvoiceId(this.data.invoice.id).subscribe(data => {
      this.productInvoices = data;
    });
  }

  closeDialog() {
    this.dialogRef.close(true);
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
    });
  }

  compareProduct(product1: Product, product2: Product): boolean {
    if (!product1 || !product1) {
      return false;
    }
    return product1.id === product2.id;
  }
}
