import { Component, OnInit, inject } from '@angular/core';
import { MainpageService } from '../../services/mainpage.service';
import { HistoriaService } from '../../services/historia.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
 export class PrincipalComponent implements OnInit {

constructor(){
  // let height = screen.height
  //   let scrollywindow:any
  //   window.addEventListener('scroll',function(){
  //     scrollywindow=this.scrollY
  //     if(scrollywindow>(height/100*35)){ this.document.getElementById('historia')?.classList.add('topshow') }else{this.document.getElementById('historia')?.classList.remove('topshow')}
  //     if(scrollywindow>(height/100*135)){ this.document.getElementById('linea-tiempo')?.classList.add('topshow') }else{this.document.getElementById('linea-tiempo')?.classList.remove('topshow')}
  //     if(scrollywindow>(height/100*220)){ this.document.getElementById('valores')?.classList.add('topshow') }else{this.document.getElementById('valores')?.classList.remove('topshow')}
  //     if(scrollywindow>(height/100*360)){ this.document.getElementById('noticias')?.classList.add('topshow') }else{this.document.getElementById('noticias')?.classList.remove('topshow')}
  //   },false)
    }

   data
   imgPrincipal
   imgFondo
  HistoriaService = inject(HistoriaService)
 
   async onSubmit(){
  }

  async ngOnInit() {
     const response = await this.HistoriaService.obtenerHistoria()
     this.data = response.historia
     this.imgPrincipal = this.data[0].imgPathPrincipal
     this.imgFondo = this.data[0].imgPathFondo
   }
}
