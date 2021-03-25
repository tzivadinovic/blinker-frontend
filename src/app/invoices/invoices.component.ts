import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {PrintOptionsDialogComponent} from './dialogs/print-options-dialog/print-options-dialog.component';
import {EditInvoiceDialogComponent} from './dialogs/edit-invoice-dialog/edit-invoice-dialog.component';
import {Invoice, InvoiceControllerService, InvoiceDetails, ProductInvoice, ProductInvoiceControllerService} from '../../openapi';
import {filterInvoice} from '../../utils/filter';
import {DeleteProductDialogComponent} from './dialogs/delete-product-dialog/delete-product-dialog.component';
import {SnackbarService} from '../../utils/snackbar-handler';
import {EditProductInvoiceDialogComponent} from './dialogs/edit-product-invoice-dialog/edit-product-invoice-dialog.component';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private invoiceService: InvoiceControllerService,
              private productInvoiceService: ProductInvoiceControllerService,
              private snackBarService: SnackbarService) {
  }

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

  async printInvoiceToPDF() {
    /*Customer info*/
    const customer: string = this.productInvoices[0].invoice.invoiceDetail.customer.name;
    const zipCode: string = this.productInvoices[0].invoice.invoiceDetail.customer.city.zipcode;
    const city: string = this.productInvoices[0].invoice.invoiceDetail.customer.city.city;
    const state: string = this.productInvoices[0].invoice.invoiceDetail.customer.state.name.toUpperCase();

    /*Invoice info*/
    const invoiceNumber: string = this.productInvoices[0].invoice.invoiceDetail.number;

    /*Normalizacija zbog naziva dokumenta*/
    const invoiceNumberForPDF: string = invoiceNumber.replace('/', '-');

    const place = 'Niš';
    const date: string = this.productInvoices[0].invoice.invoiceDetail.date;
    const paymentConditions: string = this.productInvoices[0].invoice.invoiceDetail.paymentConditions;
    const transportTerms: string = this.productInvoices[0].invoice.invoiceDetail.transportTerm.term;
    const currency: string = this.productInvoices[0].invoice.invoiceDetail.currency.currency;

    /*Financial Info*/
    const totalItems: string = this.productInvoices[0].invoice.invoiceDetail.itemsInfo;
    const grossWeight: number = this.productInvoices[0].invoice.invoiceDetail.grossWeight;
    const netWeight: number = this.productInvoices[0].invoice.invoiceDetail.netWeight;
    const totalBoxes: number = this.productInvoices[0].invoice.invoiceDetail.totalBoxes;
    const employee: string = this.productInvoices[0].invoice.invoiceDetail.employee.firstName + ' '
      + this.productInvoices[0].invoice.invoiceDetail.employee.lastName;
    const totalPrice: number = this.productInvoices[0].invoice.invoiceDetail.totalPrice;
    const shippingFees: number = this.productInvoices[0].invoice.invoiceDetail.shippingFees;

    const logo = new Image();
    logo.src = '../../assets/blinker-logo.png';

    const doc = new jsPDF();
    doc.addImage(logo, 'png', 35, 5, 45, 20);
    doc.setFontSize(8);
    doc.setTextColor('#1b10e8');
    doc.text('Blinker Co. doo - Serbia - 18000 Niš - Vojvode Putnika 50a', 20, 30);
    doc.setTextColor('#1b10e8');
    doc.text('Tel. ++381(0)18 562795; Fax: ++381 (0)18 562475 - PIB 10036937', 15, 35);
    doc.setTextColor('#000000');
    doc.setFontSize(12);
    doc.text(customer, 145, 15);
    doc.setFontSize(12);
    doc.text(zipCode + ' ' + city, 135, 23);
    doc.setFontSize(12);
    doc.text(state, 155, 31);

    doc.setFontSize(10);
    doc.text('Invoice No. ' + invoiceNumber, 15, 45);
    doc.text('Place: ' + place, 100, 45);
    doc.text('Date: ' + date, 165, 45);

    doc.setFontSize(8);
    doc.text('Payment Conditions: ' + paymentConditions, 15, 50);
    doc.text('Transport Terms: ' + transportTerms, 80, 50);
    doc.text('Currency: ' + currency, 165, 50);
    const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

    const prepare = [];
    this.productInvoices.forEach(pi => {
      const tempObj = [];
      tempObj.push(pi.itemNumber);
      tempObj.push(pi.product.code);
      tempObj.push(pi.product.description);
      tempObj.push(pi.product.unit);
      tempObj.push(pi.quantity);
      tempObj.push(pi.product.price);
      tempObj.push(new Intl.NumberFormat('en-us', {minimumFractionDigits: 2}).format(pi.product.price * pi.quantity));
      prepare.push(tempObj);
    });
    autoTable(doc, {
      head: [['Item number', 'Code', 'Description', 'Unit', 'Quantity', 'Unit price', 'Total EUR']],
      showHead: 'firstPage',
      body: prepare,
      startY: 55
    });

    // doc.text(this.productInvoices[0].invoice.invoiceDetail.number, pageWidth / 2, 5);
    doc.setFontSize(10);
    doc.text('Total EUR: ' + totalPrice, 130, 130);
    doc.text('Discount (advance payment) 0 %: 0.00', 130, 135);
    doc.text('Insurance cost EUR: 0.00', 130, 140);
    doc.text('Shipping fees EUR: ' + shippingFees, 130, 145);
    doc.text('_________________________________', 130, 150);
    doc.text('Invoice total EUR: ' + (totalPrice + shippingFees), 130, 155);

    doc.setFontSize(9);
    doc.text('Total items: ' + totalItems, 10, 235);
    doc.text('Gross weight kg. ' + grossWeight, 10, 240);
    doc.text('Net weight kg. ' + netWeight, 45, 240);
    doc.text('Total transport boxes: ' + totalBoxes, 75, 240);

    doc.setTextColor('#1b10e8');
    doc.text('Payment by SWIFT as follows:', 10, 250);
    doc.setTextColor('#000000');
    doc.text('57A:BANCA INTESA AD, Beograd, Serbia, SWIFT:DBDBRSBG', 10, 255);
    doc.text('59: IBAN: RS35160005010009658455 - Blinker Co. doo, Vojvode Putnika 50 A, 18000 Niš, Serbia', 10, 260);
    doc.text('56:DRESDNER BANK AG,Frankfurt am Main, Germany, SWIFT: DRESDEFF', 10, 265);

    doc.setFontSize(8);
    doc.setTextColor('#1b10e8');
    doc.text('Oslobodjeno PDV po clanu 24. Stav 1. Tacka 2. Službeni Glasnik RS br.84/2004', 10, 270);

    doc.text('Stamp and Signature:', 165, 265);
    doc.setTextColor('#000000');
    doc.text(employee, 160, 270);
    doc.text('_________________________', 160, 280);


    doc.save('Invoice ' + invoiceNumberForPDF + '.pdf');
  }
}
