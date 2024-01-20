import { Component, OnInit, inject } from '@angular/core';
import { MainpageService } from '../../services/mainpage.service';
import { HistoriaService } from '../../services/historia.service';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
 export class PrincipalComponent implements OnInit {

constructor(){
  let height = screen.height
  height = (height/100*25)


    let scrollywindow:any
    window.addEventListener('scroll',function(){
      scrollywindow=this.scrollY
      if(scrollywindow>height){ this.document.getElementById('historia')?.classList.add('topshow') }else{this.document.getElementById('historia')?.classList.remove('topshow')} },false)
  }


   data
   imgPrincipal
  HistoriaService = inject(HistoriaService)

   async onSubmit(){
  }

  async ngOnInit() {
     const response = await this.HistoriaService.obtenerHistoria()
     this.data = response.historia
     this.imgPrincipal = this.data[0].imgPathPrincipal
     console.log(this.imgPrincipal)
     console.log(this.data)

   }

}
