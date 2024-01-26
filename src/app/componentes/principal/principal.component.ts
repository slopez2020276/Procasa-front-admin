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

constructor(){ }
   data
   imgPrincipal
   imgFondo
  HistoriaService = inject(HistoriaService)

   async onSubmit(){ }

  async ngOnInit() {
     const response = await this.HistoriaService.obtenerHistoria()
     this.data = response.historia
     this.imgPrincipal = this.data[0].imgPathPrincipal
     this.imgFondo = this.data[0].imgPathFondo
   }
}
