import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core'; import { CommonModule } from '@angular/common';
import { Map, MapStyle, Marker, config, Popup } from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css'
})
export class MapsComponent implements OnInit, AfterViewInit, OnDestroy  {
  

  map: Map | undefined;
  mostrar: boolean = false;
  ubicacio1: any;
  ubicacio2: any;
  ubicacio3: any;
  ubicacio4: any;
  ubicacio5: any;
  ubicacio6: any;
  ubicacio7: any;
  pupop: any;
  ubicacio8: any;
  ubicacio9: any;
  ubicacio10: any;
  ubicacio11: any;
  markers: any;
  mostrarUbicaciones: string = '';
  tienda: string = '';

  mapF: Map | undefined;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  ngOnInit(): void {

    config.apiKey = 'mmhVVCeVE3UJhtmX4ezW';
    this.markers = new Marker({color:"#aa182c"}).setLngLat([-90.58707990424546,14.610695907067866])
    this.ubicacio1 = new Marker()
    this.ubicacio2 = new Marker()
    this.ubicacio3 = new Marker()
    this.ubicacio4 = new Marker()
    this.ubicacio5 = new Marker()
    this.ubicacio6 = new Marker()
    this.ubicacio7 = new Marker()
    this.ubicacio8 = new Marker()
    this.ubicacio9 = new Marker()
    this.ubicacio10 = new Marker()
    this.ubicacio11 = new Marker()

  }

  ngAfterViewInit() {
    const initialState = { lng: -90.528741, lat: 14.603684, zoom: 10 };
    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: MapStyle.STREETS,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });
    this.ubicacio1 = new Marker({ color: "#ab182d" })
      .setLngLat([-90.58750148105256, 14.612134851341485]).setPopup(new Popup().setHTML('<h1>Procasa Central1</h1>'))
      .addTo(this.map);
    this.ubicacio2 =  new Marker({ color: "#ab182d" })
    .setLngLat([-90.52819945504122, 14.6073388602745]).setPopup(new Popup().setHTML('<h1>Procasa Central2</h1>'))
    .addTo(this.map);
    this.ubicacio3 =  new Marker({ color: "#ab182d" })
    .setLngLat([-90.5216741781541, 14.614655501025824]).setPopup(new Popup().setHTML('<h1>Procasa Central3</h1>'))
    .addTo(this.map);
    this.ubicacio4 =  new Marker({ color: "#ab182d" })
    .setLngLat([-90.5087995751424, 14.593060502876403]).setPopup(new Popup().setHTML('<h1>Procasa Central4</h1>'))
    .addTo(this.map);
    this.ubicacio5 =  new Marker({ color: "#ab182d" })
    .setLngLat([-90.45764448505608, 14.55750719849885]).setPopup(new Popup().setHTML('<h1>Procasa Central5</h1>'))
    .addTo(this.map);

  // Ubicacion coodenadas Meat House

    this.ubicacio6 =  new Marker({ color: "#222222" })
    .setLngLat([-90.58690824328646, 14.608536464013127]).setPopup(new Popup().setHTML('<h1>Meat House San Cristobal</h1>'))
    .addTo(this.map);
    this.ubicacio7 =  new Marker({ color: "#222222" })
    .setLngLat([-90.58090009499428, 14.636939751825205]).setPopup(new Popup().setHTML('<h1>Procasa Central7</h1>'))
    .addTo(this.map);
    this.ubicacio8 =  new Marker({ color: "#222222" })
    .setLngLat([-90.55789747010412, 14.626641908277852]).setPopup(new Popup().setHTML('<h1>Procasa Central8</h1>'))
    .addTo(this.map);
    this.ubicacio9 =  new Marker({ color: "#222222" })
    .setLngLat([-90.54948606249503, 14.61052979701638]).setPopup(new Popup().setHTML('<h1>Procasa Central9</h1>'))
    .addTo(this.map);
    this.ubicacio10 =  new Marker({ color: "#222222" })
    .setLngLat([-90.50845899272827,14.593918136505467]).setPopup(new Popup().setHTML('<h1>Procasa Central10</h1>'))
    .addTo(this.map);

    console.log(this.markers);
    this.ubicacio1




    this.map.addLayer({
      'id': 'polygons',
      'type': 'fill',
      'source': 'cat_teritories', // reference the data source
      'layout': {},
      'paint': {
      'fill-color': '#FFAA01', // orange color fill
      'fill-opacity': 0.5
      }
    });


  }


  mostrarTrue() {
    this.mostrar = false
    console.log(this.mostrar)
    return this.map = this.mapF
  }

  removeUbi() {
    this.markers.remove()
    this.ubicacio1.remove();
    this.ubicacio2.remove();
    this.ubicacio3.remove();
    this.ubicacio4.remove();
    this.ubicacio5.remove();
    this.ubicacio6.remove();
    this.ubicacio7.remove();
    this.ubicacio8.remove();
    this.ubicacio9.remove();
    this.ubicacio10.remove();
    this.ubicacio11.remove();


    console.log('intento remove')
    console.log(this.ubicacio1)


  }

  mostarMapas(valor: string) {
    document.getElementById("cont-img-sucursales")?.classList.remove('show');

    let initialState = { lng: -90.528741, lat: 14.603684, zoom: 16 };

    switch (valor) {
      case valor = 'procasa':
        this.mostrarUbicaciones = valor;
        this.removeUbi()

        this.ubicacio1 = new Marker({ color: "#ab182d" })
        .setLngLat([-90.528741, 14.603684]).setPopup(new Popup().setHTML('<h1>Procasa Central1</h1>'))
        this.ubicacio1.addTo(this.map)


      this.ubicacio2 =  new Marker({ color: "#ab182d" })
      .setLngLat([-90.55755140618304, 14.625618303509423]).setPopup(new Popup().setHTML('<h1>Procasa Central2</h1>'))
      this.ubicacio2.addTo(this.map)


      this.ubicacio3 =  new Marker({ color: "#ab182d" })
      .setLngLat([-90.5216741781541, 14.614655501025824]).setPopup(new Popup().setHTML('<h1>Procasa Central3</h1>'))
      this.ubicacio3.addTo(this.map)


      this.ubicacio4 =  new Marker({ color: "#ab182d" })
      .setLngLat([-90.5087995751424, 14.593060502876403]).setPopup(new Popup().setHTML('<h1>Procasa Central4</h1>'))
      this.ubicacio4.addTo(this.map)


      this.ubicacio5 =  new Marker({ color: "#ab182d" })
      .setLngLat([-90.45764448505608, 14.55750719849885]).setPopup(new Popup().setHTML('<h1>Procasa Central5</h1>'))
      this.ubicacio5.addTo(this.map)



        console.log('se agrego el marker de procasa' + this.markers)
        break;

      case valor = 'meath':

        this.mostrarUbicaciones = valor
        this.removeUbi()
        console.log(this.markers)


        this.ubicacio6 =  new Marker({ color: "#222222" })
        .setLngLat([-90.58690824328646, 14.608536464013127]).setPopup(new Popup().setHTML('<h1>Meat House San Cristobal</h1>'))
        this.ubicacio6.addTo(this.map);


        this.ubicacio7 =  new Marker({ color: "#222222" })
        .setLngLat([-90.58090009499428, 14.636939751825205]).setPopup(new Popup().setHTML('<h1>Procasa Central7</h1>'))
        this.ubicacio7.addTo(this.map);

        this.ubicacio8 =  new Marker({ color: "#222222" })
        .setLngLat([-90.55789747010412, 14.626641908277852]).setPopup(new Popup().setHTML('<h1>Procasa Central8</h1>'))
        this.ubicacio8.addTo(this.map);

        this.ubicacio9 =  new Marker({ color: "#222222" })
        .setLngLat([-90.54948606249503, 14.61052979701638]).setPopup(new Popup().setHTML('<h1>Procasa Central9</h1>'))
        this.ubicacio9.addTo(this.map);

        this.ubicacio10 =  new Marker({ color: "#222222" })
        .setLngLat([-90.50845899272827,14.593918136505467]).setPopup(new Popup().setHTML('<h1>Procasa Central10</h1>'))
        this.ubicacio10.addTo(this.map);


        break;

      default:

        break;



    }
    this.tienda ='';
  }


  mostrasUbicacionIndividual(lng:number , lat: number, types:string, tiendas: string){
    document.getElementById("cont-img-sucursales")?.classList.add('show');
    this.removeUbi()
    switch (types) {

      case types = 'PR':

        this.ubicacio1 =  new Marker({ color: "#ab182d" })
        .setLngLat([lng, lat]).setPopup(new Popup().setHTML('<h1>Meat House San Cristobal</h1>'))
        this.ubicacio1.addTo(this.map);

        break;
      case types = 'MH':

      this.ubicacio1 =  new Marker({ color: "#222222" })
        .setLngLat([lng, lat]).setPopup(new Popup().setHTML('<h1>Meat House San Cristobal</h1>'))
        this.ubicacio1.addTo(this.map);
        break;

      default:

        break;



    }

    this.ubicacio1.addTo(this.map)
    this.tienda = tiendas
    this.mostrarUbicaciones = '';

  }


  cerrarUbicacionIndivudal(type: string){
    document.getElementById("cont-img-sucursales")?.classList.remove('show');
    this.tienda = '';
    this.mostarMapas( type );
  }

  ngOnDestroy() {
    this.map?.remove();
  }

}
