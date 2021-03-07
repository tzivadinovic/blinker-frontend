import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DeleteProductDialogComponent} from '../../invoices/dialogs/delete-product-dialog/delete-product-dialog.component';
import {CreateCityDialogComponent} from './dialogs/create-city-dialog/create-city-dialog.component';
import {MatTableDataSource} from '@angular/material/table';
import {City, CityControllerService} from '../../../openapi';
import {MatPaginator} from '@angular/material/paginator';
import {SnackbarService} from '../../../utils/snackbar-handler';
import {filterCity, filterState} from '../../../utils/filter';


@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  displayedColumns: string[] = ['city', 'zipcode', 'options'];
  dataSource = new MatTableDataSource<City>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  cities: City[] = [];

  constructor(public dialog: MatDialog,
              private cityService: CityControllerService,
              private snackBarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.getAllCities();
  }

  openCreateCityDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(CreateCityDialogComponent, dialogConfig).afterClosed().subscribe(() => {
      this.getAllCities();
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
          this.cityService.deleteCityById(id).subscribe(() => {
            this.snackBarService.showSuccessSnackbar('Successfully deleted city');
            this.getAllCities();
          });
        } else if (result === 'no') {
          this.dialog.closeAll();
        }
      }
    });
  }

  getAllCities(): void {
    this.cityService.getAllCities().subscribe(data => {
      this.cities = data;
      this.dataSource.data = this.cities;
      this.dataSource.paginator = this.paginator;
    });
  }

  searchCity(inputPar: string) {
    if (inputPar) {
      this.dataSource.data = this.cities.filter(item => filterCity(item, inputPar));
    } else {
      this.dataSource.data = this.cities;
    }
  }

}
