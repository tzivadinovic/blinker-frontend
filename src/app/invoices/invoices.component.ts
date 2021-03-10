import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {PrintOptionsDialogComponent} from './dialogs/print-options-dialog/print-options-dialog.component';
import {EditInvoiceDialogComponent} from './dialogs/edit-invoice-dialog/edit-invoice-dialog.component';
import {
  Invoice,
  InvoiceControllerService,
  InvoiceDetails,
  ProductInvoice,
  ProductInvoiceControllerService
} from '../../openapi';
import {filterInvoice} from '../../utils/filter';
import {DeleteProductDialogComponent} from './dialogs/delete-product-dialog/delete-product-dialog.component';
import {SnackbarService} from '../../utils/snackbar-handler';
import {EditProductInvoiceDialogComponent} from './dialogs/edit-product-invoice-dialog/edit-product-invoice-dialog.component';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  panelOpenState = false;
  displayedColumns: string[] = ['itemNo', 'code', 'description', 'unit', 'quantity', 'price', 'totalValue', 'options'];
  invoices: Invoice[] = [];
  productInvoices: ProductInvoice[] = [];
  dataSource = new MatTableDataSource<ProductInvoice>([]);
  invoiceTotalValue: number;
  totalBoxes: number;

  form = new FormGroup({
    itemsInfo: new FormControl(null, [Validators.required])
  });

  constructor(public dialog: MatDialog,
              private invoiceService: InvoiceControllerService,
              private productInvoiceService: ProductInvoiceControllerService,
              private snackBarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.getAllInvoices();
  }

  openPrintOptionsDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(PrintOptionsDialogComponent, dialogConfig).afterClosed();
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

  openEditRecordDialog(productInvoice: ProductInvoice) {
    const dialogConfig = this.dialog.open(EditProductInvoiceDialogComponent, {
      width: '800px',
      data: productInvoice
    });
    dialogConfig.afterClosed().subscribe(() => {
      this.getProductInvoicesForInvoiceId(productInvoice.invoice.id);
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
            this.panelOpenState = false;
          });
        } else if (result === 'no') {
          this.dialog.closeAll();
        }
      }
    });
  }

  getInvoiceTotalValue(invoiceId: number) {
    this.productInvoiceService.totalValue(invoiceId).subscribe(data => {
      this.invoiceTotalValue = data;
    });
  }

  getInvoiceTotalBoxes(invoiceId: number) {
    this.productInvoiceService.totalBoxes(invoiceId).subscribe(data => {
      this.totalBoxes = data['value'];
    });
  }
}
