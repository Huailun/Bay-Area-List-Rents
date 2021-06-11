import { MapsAPILoader} from '@agm/core';
import {Component, ViewChild, AfterViewInit} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import {AppService} from '../app.service';
import { CityMapComponent } from '../city-map/city-map.component';
import {ListRent} from './list';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements AfterViewInit {

  displayedColumns: string[] = ['city', 'county', 'year', 'median_list_rent', 'median_list_rent_ia', 'median_list_rent_percentchg_1994', 'median_list_rent_ia_percentchg_1994', 'link'];
  dataSource: MatTableDataSource<ListRent>;
  filterText: string;
  minYear: number;
  maxYear: number;
  geocoder: any;
  lat: number;
  lng: number;
  
  resultsLength = 0;
  value = 0;
  years = [];
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(public appService: AppService, public dialog: MatDialog, private mapsAPILoader: MapsAPILoader) {
    this.dataSource =  new MatTableDataSource<ListRent>();
    this.appService.getListRents().subscribe( 
      res => {
        this.dataSource.data = [...res];
        this.years.push(res.map(f => parseInt(f.year)));
        this.minYear = Math.min(...this.years[0]);
        this.maxYear = Math.max(...this.years[0]);
      });

    this.mapsAPILoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;  

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterText = filterValue.trim();
    this.dataSource.filter = this.filterText.toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onInputChange(value: number){
    const sliderValue = value.toString();
    this.dataSource.filter = sliderValue;
  }

  formatLabel(value: number) {
    return value;
  }

  openDialog(data){
    this.geocoder.geocode({
      'address': `${data} CA`
    },
    (results, status) => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '600px';
      dialogConfig.disableClose = false;
      if (status == google.maps.GeocoderStatus.OK){
        if (results[0].geometry.location){
          this.lat = results[0].geometry.location.lat();
          this.lng = results[0].geometry.location.lng();
          dialogConfig.data = {
            city: data,
                lat: this.lat,
                lng: this.lng,
                zoom: 14
          }
        }
      }
      this.dialog.open(CityMapComponent,dialogConfig);
    })
  }
}

