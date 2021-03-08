import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DeleteProductDialogComponent} from '../../invoices/dialogs/delete-product-dialog/delete-product-dialog.component';
import {MatTableDataSource} from '@angular/material/table';
import {State, StateControllerService} from '../../../openapi';
import {MatPaginator} from '@angular/material/paginator';
import {CreateStateDialogComponent} from './dialogs/create-state-dialog/create-state-dialog.component';
import {SnackbarService} from '../../../utils/snackbar-handler';
import {EditStateDialogComponent} from './dialogs/edit-state-dialog/edit-state-dialog.component';
import {filterState} from '../../../utils/filter';

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

  constructor(public dialog: MatDialog,
              private stateService: StateControllerService,
              private snackBarService: SnackbarService) {
  }

  ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

  ngOnInit(): void {
    this.getAllStates();
  }

  openCreateStateDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(CreateStateDialogComponent, dialogConfig).afterClosed().subscribe(() => {
      this.getAllStates();
    });
  }

  openEditStateDialog(state: State): void {
    const dialogConfig = this.dialog.open(EditStateDialogComponent, {
      width: '500px',
      data: state
    });
    dialogConfig.afterClosed().subscribe(() => {
      this.getAllStates();
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
          this.stateService.deleteStateById(id).subscribe(() => {
            this.snackBarService.showSuccessSnackbar('Successfully deleted state');
            this.getAllStates();
          });
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

  searchState(inputPar: string) {
    if (inputPar) {
      this.dataSource.data = this.states.filter(item => filterState(item, inputPar));
    } else {
      this.dataSource.data = this.states;
    }
  }

}
