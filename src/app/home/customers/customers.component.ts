import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DeleteProductDialogComponent} from '../../invoices/dialogs/delete-product-dialog/delete-product-dialog.component';
import {MatTableDataSource} from '@angular/material/table';
import {Customer, CustomerControllerService, Employee} from '../../../openapi';
import {MatPaginator} from '@angular/material/paginator';
import {CreateCustomerDialogComponent} from './dialogs/create-customer-dialog/create-customer-dialog.component';
import {EditCustomerDialogComponent} from './dialogs/edit-customer-dialog/edit-customer-dialog.component';
import {SnackbarService} from '../../../utils/snackbar-handler';
import {filterCustomer} from '../../../utils/filter';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  displayedColumns: string[] = ['name', 'state', 'city', 'options'];
  dataSource = new MatTableDataSource<Customer>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  customers: Customer[] = [];

  constructor(public dialog: MatDialog,
              private customerService: CustomerControllerService,
              private snackBarService: SnackbarService,
  ) {
  }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  openCreateCustomerDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(CreateCustomerDialogComponent, dialogConfig).afterClosed().subscribe(() => {
      this.getAllCustomers();
    });
  }

  openEditCustomerDialog(employee: Employee): void {
    const dialogConfig = this.dialog.open(EditCustomerDialogComponent, {
      width: '500px',
      data: employee
    });
    dialogConfig.afterClosed().subscribe(() => {
      this.getAllCustomers();
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
          this.customerService.deleteCustomerById(id).subscribe(() => {
            this.snackBarService.showSuccessSnackbar('Successfully deleted customer');
            this.getAllCustomers();
          });
        } else if (result === 'no') {
          this.dialog.closeAll();
        }
      }
    });
  }

  getAllCustomers(): void {
    this.customerService.getAllCustomers().subscribe(data => {
      this.customers = data;
      this.dataSource.data = this.customers;
      this.dataSource.paginator = this.paginator;
    });
  }

  searchCustomer(inputPar: string) {
    if (inputPar) {
      this.dataSource.data = this.customers.filter(item => filterCustomer(item, inputPar));
    } else {
      this.dataSource.data = this.customers;
    }
  }
}
