import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-city-map',
  templateUrl: './city-map.component.html',
  styleUrls: ['./city-map.component.css']
})
export class CityMapComponent {

  lat: number;
  lng: number;
  zoom: number;
  constructor(
    public dialogRef: MatDialogRef<CityMapComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.lat = data.lat;
    this.lng = data.lng;
    this.zoom = data.zoom;
    }

}
