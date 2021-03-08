import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DeleteProductDialogComponent} from '../../invoices/dialogs/delete-product-dialog/delete-product-dialog.component';
import {Currency, CurrencyControllerService} from '../../../openapi';
import {MatTableDataSource} from '@angular/material/table';
import {SnackbarService} from '../../../utils/snackbar-handler';
import {filterCurrency, filterTransportTerm} from '../../../utils/filter';
import {CreateCurrencyDialogComponent} from './dialogs/create-currency-dialog/create-currency-dialog.component';
import {EditCurrencyDialogComponent} from './dialogs/edit-currency-dialog/edit-currency-dialog.component';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit {
  currencies: Currency[] = [];
  displayedColumns: string[] = ['currency', 'options'];
  dataSource = new MatTableDataSource<Currency>([]);

  constructor(public dialog: MatDialog,
              private snackBarService: SnackbarService,
              private currencyService: CurrencyControllerService) {
  }


  ngOnInit(): void {
    this.getAllCurrencies();
  }

  openCreateCurrencyDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(CreateCurrencyDialogComponent, dialogConfig).afterClosed().subscribe(() => {
      this.getAllCurrencies();
    });
  }

  openEditCurrencyDialog(currency: Currency): void {
    const dialogConfig = this.dialog.open(EditCurrencyDialogComponent, {
      width: '500px',
      data: currency
    });
    dialogConfig.afterClosed().subscribe(() => {
      this.getAllCurrencies();
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
          this.currencyService.deleteCurrencyById(id).subscribe(() => {
            this.snackBarService.showSuccessSnackbar('Successfully deleted currency');
            this.getAllCurrencies();
          });
        } else if (result === 'no') {
          this.dialog.closeAll();
        }
      }
    });
  }

  getAllCurrencies(): void {
    this.currencyService.getAllCurrencies().subscribe(data => {
      this.currencies = data;
      this.dataSource.data = this.currencies;
    });
  }

  searchCurrency(inputPar: string) {
    if (inputPar) {
      this.dataSource.data = this.currencies.filter(item => filterCurrency(item, inputPar));
    } else {
      this.dataSource.data = this.currencies;
    }
  }

}
