import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DeleteProductDialogComponent} from '../../invoices/dialogs/delete-product-dialog/delete-product-dialog.component';
import {MatTableDataSource} from '@angular/material/table';
import {Employee, EmployeeControllerService} from '../../../openapi';
import {MatPaginator} from '@angular/material/paginator';
import {SnackbarService} from '../../../utils/snackbar-handler';
import {CreateEmployeeDialogComponent} from './dialogs/create-employee-dialog/create-employee-dialog.component';
import {EditEmployeeDialogComponent} from './dialogs/edit-employee-dialog/edit-employee-dialog.component';
import {filterEmployee} from '../../../utils/filter';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'position', 'bank', 'bankAccount', 'phoneNumber', 'address', 'employmentPeriod', 'options'];
  dataSource = new MatTableDataSource<Employee>([]);
  employees: Employee[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(public dialog: MatDialog,
              private employeeService: EmployeeControllerService,
              private snackBarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  openCreateEmployeeDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(CreateEmployeeDialogComponent, dialogConfig).afterClosed().subscribe(() => {
      this.getAllEmployees();
    });
  }

  openEditEmployeeDialog(employee: Employee): void {
    const dialogConfig = this.dialog.open(EditEmployeeDialogComponent, {
      width: '500px',
      data: employee
    });
    dialogConfig.afterClosed().subscribe(() => {
      this.getAllEmployees();
    });
  }

  openDeleteEmployeeDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteProductDialogComponent, {
      width: '400px',
      backdropClass: 'background'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result === 'yes') {
          this.employeeService.deleteEmployeeById(id).subscribe(() => {
            this.snackBarService.showSuccessSnackbar('Successfully deleted employee');
            this.getAllEmployees();
          });
        } else if (result === 'no') {
          this.dialog.closeAll();
        }
      }
    });
  }

  getAllEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(data => {
      this.employees = data;
      this.dataSource.data = this.employees;
      this.dataSource.paginator = this.paginator;
    });
  }

  searchEmployee(inputPar: string) {
    if (inputPar) {
      this.dataSource.data = this.employees.filter(item => filterEmployee(item, inputPar));
    } else {
      this.dataSource.data = this.employees;
    }
  }
}
