import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet'
import { UbicacionServiceService } from '../../services/ubicacion-service.service';

@Component({
  selector: 'app-prueba-maps',
  templateUrl: './prueba-maps.component.html',
  styleUrls: ['./prueba-maps.component.css']
})
export class PruebaMapsComponent implements OnInit, AfterViewInit {
  map: L.Map;
  marker: L.Marker;
  data

  codenadasLng
  codenadaslat
  descripcion
  imgPath
  nombreTienda
  tipoTienda
  id

  constructor(private ubicaciones: UbicacionServiceService) {}

  ngOnInit() {

    this.ubicaciones.ObtenerUbicaciones().subscribe({
      next: (data: any) => {
        console.log('Datos recibidos:', data);
        this.addMarkers(data.ubi)
        this.data = data.ubi
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
    this.initMap()
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
          const lat = parseFloat(ubicacion.codenadaslat)
          const lng = parseFloat(ubicacion.codenadasLng)

          const marker = L.marker([lat, lng], { icon: L.icon({ iconUrl: '../../../assets/images/marker-icon.png' }) }).addTo(this.map);
        } else {
          console.error('Ubicación no válida:', ubicacion)
        }
      })

      if (this.map && ubiArray.length > 1) {
        const bounds = L.latLngBounds(ubiArray.map(ubicacion => [ubicacion.codenadaslat, ubicacion.codenadasLng]))
        this.map.fitBounds(bounds);
      }
    } else {
      console.error('El arreglo de ubicaciones está vacío o no definido:', ubiArray)
    }
  }




 ToggleDetails(id){

  this.ubicaciones.ObtenerUbicacionesxID(id).subscribe({
    next: (data: any) => {
      console.log('Datos recibidos:', data);

      const ubiArr = Object.values(data.ubi);

      this.codenadasLng = data.ubi.codenadasLng
      this.codenadaslat = data.ubi.codenadaslat
      this.descripcion = data.ubi.descripcion
      this.imgPath = data.ubi.imgPath
      this.nombreTienda = data.ubi.nombreTienda
      this.tipoTienda = data.ubi.tipoTienda
      this.id = data.ubi._id

      this.addMarkers(ubiArr)
    },
    error: (error) => {
      console.error('Error al obtener datos:', error);
    },
    complete: () => {
      console.log('Suscripción completa');
    }
  });


  document.getElementById('cont-sucursales-buttons-1')?.classList.remove('show')
  document.getElementById('cont-sucursales-buttons-2')?.classList.remove('show')
  document.getElementById('cont-img')?.classList.add('show')



}

CloseSucursal() {

  this.ubicaciones.ObtenerUbicaciones().subscribe({
    next: (data: any) => {
      console.log('Datos recibidos:', data);
      this.addMarkers(data.ubi)
      this.data = data.ubi
    },
    error: (error) => {
      console.error('Error al obtener datos:', error);
    },
    complete: () => {
      console.log('Suscripción completa');
    }
  });



  document.getElementById('cont-sucursales-buttons-1')?.classList.remove('show')
  document.getElementById('cont-sucursales-buttons-2')?.classList.remove('show')
  document.getElementById('cont-img')?.classList.remove('show')
}

async ObtnerSucursalesMT(){

  this.ubicaciones.ObtenerUbicacionesMt().subscribe({
    next: (data: any) => {
      console.log('Datos recibidos:', data);
      this.addMarkers(data.ubi)
      this.data = data.ubi
    },
    error: (error) => {
      console.error('Error al obtener datos:', error);
    },
    complete: () => {
      console.log('Suscripción completa');
    }
  });
}


async ObtenerSuccursalesPR(){

  this.ubicaciones.ObtenerUbicacionesPr().subscribe({
    next: (data: any) => {
      console.log('Datos recibidos:', data);
      this.addMarkers(data.ubi)
      this.data = data.ubi
    },
    error: (error) => {
      console.error('Error al obtener datos:', error);
    },
    complete: () => {
      console.log('Suscripción completa');
    }
  });

}

OpenSucursales1(tipo:string){


  switch(tipo){
    case 'meath':{
      this.ObtnerSucursalesMT();
    }
    break;
    case 'procasa':{
      this.ObtenerSuccursalesPR();
    }
  }

  document.getElementById('cont-sucursales-buttons-1')?.classList.add('show')
  document.getElementById('cont-sucursales-buttons-2')?.classList.remove('show')
  document.getElementById('cont-img')?.classList.remove('show')
}

OpenSucursales2(){
  document.getElementById('cont-sucursales-buttons-2')?.classList.add('show')
  document.getElementById('cont-sucursales-buttons-1')?.classList.remove('show')
  document.getElementById('cont-img')?.classList.remove('show')
}



}
