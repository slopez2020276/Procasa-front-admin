import { Component, OnInit, inject } from '@angular/core';
import { MisionService } from '../../services/mision.service';
import { NoticasService } from '../../services/noticas.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css'
})


export class NoticiasComponent implements OnInit{
  data
  enlace :string = ''
  message:string = ''
  NoticiasService = inject(NoticasService)
  descricion: string = ''

  async ngOnInit()  {
    const response = await this.NoticiasService.obtenerNoticas()
    this.data = response.noticas
    console.log(this.data)


// function calcularFecha(fecha1: string, fecha2: string): number {
//   const date1 = new Date(fecha1)
//   const date2 = new Date(fecha2)

//   const diferenciaEnMilisegundos = Math.abs(date2.getTime() - date1.getTime())
//   const diferenciaEnDias = Math.ceil(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24))

//   return diferenciaEnDias;
// }
// let e: number = -1;

// this.data.forEach((element, index) => {
//     const fechaISO: Date = new Date(this.data[e].fecha)
//     const fechaCurr: Date = new Date()

//     const diai: string = fechaISO.getDate().toString().padStart(2, '0')
//     const diac: string = fechaCurr.getDate().toString().padStart(2, '0')
//     const mesi: string = (fechaISO.getMonth() + 1).toString().padStart(2, '0')
//     const mesc: string = (fechaCurr.getMonth() + 1).toString().padStart(2, '0')
//     const añoi: string = fechaISO.getFullYear().toString().slice(2)
//     const añoc: string = fechaCurr.getFullYear().toString().slice(2)

//     const fechasnoticia: string = `20${añoi}-${mesi}-${diai}`;
//     const fechahoy: string = `20${añoc}-${mesc}-${diac}`;

//     const diasRest: number = calcularFecha(fechasnoticia, fechahoy);


//     if (e < document.getElementsByClassName('days').length) {
//       document.getElementsByClassName('days')[e].innerHTML = calcularFecha(fechasnoticia, fechahoy).toString()
//       console.log(document.getElementsByClassName('days')[e])
//       console.log(e)

//       if (diasRest === 0) {
//           this.message = "Hoy"
//         } else if (diasRest > 0) {
//           this.message = 'Hace ' + diasRest + ' días'
//         }
//       }
//       e += 1
//     })
}

}
