import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Invoice, InvoiceControllerService, InvoiceDetails, Product, ProductInvoice, ProductInvoiceControllerService} from '../../openapi';
import {SnackbarService} from '../../utils/snackbar-handler';
import {EditInvoiceDialogComponent} from '../invoices/dialogs/edit-invoice-dialog/edit-invoice-dialog.component';
import {filterInvoice} from '../../utils/filter';
import {EditProductInvoiceDialogComponent} from '../invoices/dialogs/edit-product-invoice-dialog/edit-product-invoice-dialog.component';
import {DeleteProductDialogComponent} from '../invoices/dialogs/delete-product-dialog/delete-product-dialog.component';


@Component({
  selector: 'app-packing-lists',
  templateUrl: './packing-lists.component.html',
  styleUrls: ['./packing-lists.component.css']
})
export class PackingListsComponent implements OnInit {
  panelOpenState = false;
  displayedColumns: string[] = ['boxNumber', 'code', 'title', 'description', 'unit', 'quantity', 'price', 'totalValue', 'options'];
  invoices: Invoice[] = [];
  productInvoices: ProductInvoice[] = [];

  constructor(public dialog: MatDialog,
              private invoiceService: InvoiceControllerService,
              private productInvoiceService: ProductInvoiceControllerService,
              private snackBarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.getAllInvoices();
  }

  openEditInvoiceDialog(invoiceDetails: InvoiceDetails): void {
    const dialogConfig = this.dialog.open(EditInvoiceDialogComponent, {
      width: '500px',
      data: invoiceDetails
    });
    dialogConfig.afterClosed().subscribe(() => {
      this.getAllInvoices();
    });
  }

  getAllInvoices(): void {
    this.invoiceService.getAllInvoices().subscribe(data => {
      this.invoices = data;
    });
  }

  getProductInvoicesForInvoiceId(invoiceId: number) {
    this.productInvoiceService.findByInvoiceId(invoiceId).subscribe(data => {
      this.productInvoices = data;
    });
  }

  searchInvoice(inputPar: string) {
    if (inputPar) {
      this.invoices = this.invoices.filter(item => filterInvoice(item, inputPar));
    } else {
      this.getAllInvoices();
    }
  }

  openEditRecordDialog(productInvoice: ProductInvoice, product: Product) {
    const dialogConfig = this.dialog.open(EditProductInvoiceDialogComponent, {
      width: '500px',
      data: [
        product, productInvoice
      ]

    });
    dialogConfig.afterClosed().subscribe(() => {
    });
  }

  openDeleteRecordDialog(id: number) {
    const dialogRef = this.dialog.open(DeleteProductDialogComponent, {
      width: '400px',
      backdropClass: 'background'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result === 'yes') {
          this.productInvoiceService.deleteProductInvoiceById(id).subscribe(() => {
            this.snackBarService.showSuccessSnackbar('Successfully deleted record');
            this.getProductInvoicesForInvoiceId(id);
          });
        } else if (result === 'no') {
          this.dialog.closeAll();
        }
      }
    });
  }
}
