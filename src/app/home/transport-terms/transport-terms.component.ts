import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DeleteProductDialogComponent} from '../../invoices/dialogs/delete-product-dialog/delete-product-dialog.component';
import {TransportTerm, TransportTermControllerService} from '../../../openapi';
import {MatTableDataSource} from '@angular/material/table';
import {SnackbarService} from '../../../utils/snackbar-handler';
import {filterTransportTerm} from '../../../utils/filter';
import {CreateTransportTermDialogComponent} from './dialogs/create-transport-term-dialog/create-transport-term-dialog.component';
import {EditTransportTermDialogComponent} from './dialogs/edit-transport-term-dialog/edit-transport-term-dialog.component';


@Component({
  selector: 'app-transport-terms',
  templateUrl: './transport-terms.component.html',
  styleUrls: ['./transport-terms.component.css']
})
export class TransportTermsComponent implements OnInit {
  transportTerms: TransportTerm[] = [];
  displayedColumns: string[] = ['term', 'options'];
  dataSource = new MatTableDataSource<TransportTerm>([]);

  constructor(public dialog: MatDialog,
              private snackBarService: SnackbarService,
              private transportTermService: TransportTermControllerService) {
  }


  ngOnInit(): void {
    this.getAllTransportTerms();
  }

  openCreateTransportTermDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(CreateTransportTermDialogComponent, dialogConfig).afterClosed().subscribe(() => {
      this.getAllTransportTerms();
    });
  }

  openEditTransportTermDialog(transportTerm: TransportTerm): void {
    const dialogConfig = this.dialog.open(EditTransportTermDialogComponent, {
      width: '500px',
      data: transportTerm
    });
    dialogConfig.afterClosed().subscribe(() => {
      this.getAllTransportTerms();
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
          this.transportTermService.deleteTransportTermById(id).subscribe(() => {
            this.snackBarService.showSuccessSnackbar('Successfully deleted transport term');
            this.getAllTransportTerms();
          });
        } else if (result === 'no') {
          this.dialog.closeAll();
        }
      }
    });
  }

  getAllTransportTerms(): void {
    this.transportTermService.getAllTransportTerms().subscribe(data => {
      this.transportTerms = data;
      this.dataSource.data = this.transportTerms;
    });
  }

  searchTransportTerm(inputPar: string) {
    if (inputPar) {
      this.dataSource.data = this.transportTerms.filter(item => filterTransportTerm(item, inputPar));
    } else {
      this.dataSource.data = this.transportTerms;
    }
  }
}
