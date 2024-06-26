import { Component, OnInit, inject,AfterViewInit, HostListener,Renderer2 } from '@angular/core';
import { MainpageService } from '../../../services/mainpage.service';
import { HistoriaService } from '../../../services/historia.service';
import { NgOptimizedImage } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
 export class PrincipalComponent implements OnInit {

   data
   imgPrincipal
   imgFondo
   imgPrincipalMovil
   imgFondoMovil
   TamanioPantalla
   colorn
   tipoBack 
  HistoriaService = inject(HistoriaService)
  count:any = 0
  id:any





   async onSubmit(){ }

  async ngOnInit(): Promise<void> {
     const response = await this.HistoriaService.obtenerHistoria()
     this.data = response.historia
     this.imgPrincipal = this.data[0].imgPathPrincipal
     this.imgFondo = this.data[0].imgPathFondo
     this.colorn = this.data[0].colorFondo
     this.evaluarTipoBack()
    


     this.imgPrincipalMovil = this.data[0].imgPathPrincipalMobil
     this.imgFondoMovil = this.data[0].imgPathFondoMobil
     console.log(this.data)
     console.log(this.colorn)

    //  this.scrollTopService.setScrollTop()

}





evaluarTipoBack(){
  if(this.data[0].backgroundTipo == true){
    this.tipoBack = true
  }else if(this.data[0].backgroundTipo == false){
    this.tipoBack = false
  }
}

constructor(private route: ActivatedRoute,private renderer: Renderer2) {
  this.obtenerTamanioVentana()
}



@HostListener('window:resize', ['$event'])
obtenerTamanioVentana() {
  const anchoVentana = window.innerWidth;

  // Define tu lógica para elegir la dirección basada en el tamaño de la pantalla
  if (anchoVentana <= 768) {
    this.TamanioPantalla = 'direccion-pequena';
    console.log(this.TamanioPantalla)
  } else {
    this.TamanioPantalla = 'direccion-grande';
    console.log(this.TamanioPantalla)

  }
}
desplazarElemento(id) { const elemento:HTMLElement | any = document.getElementById(id); if (elemento) { const desplazamientoEnPX = 60; window.scrollTo({ top: elemento.offsetTop - desplazamientoEnPX,  behavior: 'smooth' }) } }

ngAfterViewInit(){
  
  this.route.params.subscribe(params => { this.id = params['historia']; this.desplazarElemento(this.id) })
  this.route.params.subscribe(params => { this.id = params['linea-tiempo']; this.desplazarElemento(this.id) })
  this.route.params.subscribe(params => { this.id = params['mision-vision-valores']; this.desplazarElemento(this.id) })
  this.route.params.subscribe(params => { this.id = params['noticias']; this.desplazarElemento(this.id) })
}

}


