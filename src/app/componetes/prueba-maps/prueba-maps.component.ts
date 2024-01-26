import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { UbicacionServiceService } from '../../services/ubicacion-service.service';

@Component({
  selector: 'app-prueba-maps',
  templateUrl: './prueba-maps.component.html',
  styleUrls: ['./prueba-maps.component.css']
})
export class PruebaMapsComponent implements OnInit, AfterViewInit {
  map: L.Map;
  marker: L.Marker;

  constructor(private ubicaciones: UbicacionServiceService) {}

  ngOnInit() {
    this.ubicaciones.ObtenerUbicaciones().subscribe({
      next: (data: any) => {
        console.log('Datos recibidos:', data);
        this.addMarkers(data.ubi);
      },
      error: (error) => {
        console.error('Error al obtener datos:', error);
      },
      complete: () => {
        console.log('Suscripción completa');
      }
    });
  }

  ngAfterViewInit() {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([ 14.603684,-90.528741], 12);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
  }

  private addMarkers(ubiArray): void {
    // Verifica que el arreglo tenga al menos un elemento antes de intentar agregar marcadores
    if (ubiArray && ubiArray.length > 0) {
      ubiArray.forEach((ubicacion) => {
        // Verifica que el objeto tenga las propiedades de coordenadas
        if (ubicacion && ubicacion.codenadaslat && ubicacion.codenadasLng) {
          const lat = parseFloat(ubicacion.codenadaslat);
          const lng = parseFloat(ubicacion.codenadasLng);
  
          // Agrega un marcador para cada ubicación
          const marker = L.marker([lat, lng], { icon: L.icon({ iconUrl: '../../../assets/images/marker-icon.png' }) }).addTo(this.map);
          
          // Puedes personalizar el marcador según tus necesidades
          // marker.bindPopup('Información del marcador');
  
          // Puedes agregar cada marcador a un array si necesitas gestionarlos posteriormente
          // this.markers.push(marker);
        } else {
          console.error('Ubicación no válida:', ubicacion);
        }
      });
  
      // Opcional: Ajusta la vista del mapa para incluir todos los marcadores
      if (this.map && ubiArray.length > 1) {
        const bounds = L.latLngBounds(ubiArray.map(ubicacion => [ubicacion.codenadaslat, ubicacion.codenadasLng]));
        this.map.fitBounds(bounds);
      }
    } else {
      console.error('El arreglo de ubicaciones está vacío o no definido:', ubiArray);
    }
  }
  
}
