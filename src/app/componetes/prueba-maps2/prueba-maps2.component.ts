import { Component, AfterViewInit  } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-prueba-maps2',
  templateUrl: './prueba-maps2.component.html',
  styleUrl: './prueba-maps2.component.css'
})
export class PruebaMaps2Component  implements AfterViewInit   {

  private map;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
   }
  
}
