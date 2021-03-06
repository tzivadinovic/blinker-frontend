import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CreateProductDialogComponent} from '../../invoices/dialogs/create-product-dialog/create-product-dialog.component';
import {EditProductDialogComponent} from '../../invoices/dialogs/edit-product-dialog/edit-product-dialog.component';
import {DeleteProductDialogComponent} from '../../invoices/dialogs/delete-product-dialog/delete-product-dialog.component';
import {MatTableDataSource} from '@angular/material/table';
import {State, StateControllerService} from '../../../openapi';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css']
})
export class StatesComponent implements OnInit, AfterViewInit {
  states: State[] = [];
  displayedColumns: string[] = ['name', 'options'];
  dataSource = new MatTableDataSource<State>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private stateService: StateControllerService) {
  }

  ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

  ngOnInit(): void {
    this.getAllStates();
  }

  openCreateProductDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(CreateProductDialogComponent, dialogConfig).afterClosed();
  }

  openEditProductDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(EditProductDialogComponent, dialogConfig).afterClosed();
  }

  openDeleteProductDialog(): void {
    const dialogRef = this.dialog.open(DeleteProductDialogComponent, {
      width: '400px',
      backdropClass: 'background'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result === 'yes') {

        } else if (result === 'no') {
          this.dialog.closeAll();
        }
      }
    });
  }

  getAllStates(): void {
    this.stateService.getAllStates().subscribe(data => {
      this.states = data;
      this.dataSource.data = this.states;
      this.dataSource.paginator = this.paginator;
    });
  }

}
