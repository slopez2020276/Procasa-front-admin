import { Component, inject } from '@angular/core';
import { UneteEquipoService } from '../../services/unete-equipo.service';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrl: './equipo.component.css'
})
export class EquipoComponent {
  uneterService = inject(UneteEquipoService)
  dataUnete
  subCount: number = 0
  subsArray: number[] = []
  inputEmpty:string = "Seleccionar archivo"
  inputEmptyB:string = "Seleccionar archivo"

  ngOnInit(): void {
    this.obtenerUnete()
  }

  ModalProduct(type:string){
    document.getElementById(type)?.classList.toggle('show')
    document.getElementById('cont-modal-inputs')?.classList.remove('show')
   }


  FileEdit(event: Event): void {
    const fileInput = event.target as HTMLInputElement
    const archivo = fileInput.files?.[0]
    if (archivo) {
      const lector = new FileReader()

      lector.onload = (eventoLectura:any) => {
        console.log(eventoLectura)
        const imagen = new Image()
        imagen.src = eventoLectura.target.result

        imagen.onload = () => {
          const fileSize: number = archivo.size
          const size: number = fileSize / 1024
          let medida: string
          let sizemedida: any
          if (size < 1024) {
            medida = " KB"
            sizemedida = size.toFixed(2).toString() + medida
          } else {
            medida = " MB"
            sizemedida = (size / 1024).toFixed(2).toString() + medida
          }
          const fileName: string = archivo.name
          const img = new Image()
          const objectURL = URL.createObjectURL(archivo)
          img.src = objectURL

          document.getElementsByClassName('innerdetails')[2]!.innerHTML = sizemedida
          document.getElementsByClassName('innerdetails')[0]!.innerHTML = imagen.width + " px"
          document.getElementsByClassName('innerdetails')[1]!.innerHTML = imagen.height + " px"
          document.getElementById('img-pre-tl')?.setAttribute('src', img.src)
        }
      }
      lector.readAsDataURL(archivo)
    }
  }




DeletePlaza(){
  const innerMessage = document.getElementsByClassName('innermsg')[0]
  if (innerMessage) { innerMessage.innerHTML = "¿Desea eliminar el evento seleccionado?"

  document.getElementsByClassName('container-alert')[0]?.classList.add('show')
  document.getElementsByClassName('message')[0]?.classList.add('show')
  document.getElementsByClassName('cont-btns-alert')[0]?.classList.add('show')

  document.getElementsByClassName('cancel')[0]?.addEventListener('click', function(){
    document.getElementsByClassName('container-alert')[0]?.classList.remove('show')
    document.getElementsByClassName('message')[0]?.classList.remove('show')
    document.getElementsByClassName('cont-btns-alert')[0]?.classList.remove('show')
  },false)

  document.getElementsByClassName('confirm')[0]?.addEventListener('click', async () => {
    document.getElementsByClassName('cont-btns-alert')[0]?.classList.remove('show')
    // const respuestaDelete = await this.lineaService.eliminarLineaTIempo(id)
    document.getElementsByClassName('cont-btns-alert')[0]?.classList.remove('show'); this.MessageSuccess('Plaza eliminada',0) }, false) }
}






MessageSuccess(text: string, i: number){
    const innermsg = document.getElementsByClassName('innermsg')[i]
    if (innermsg) { innermsg.innerHTML = text
      document.getElementsByClassName('container-alert')[i]?.classList.add('show')
      document.getElementsByClassName('message')[i]?.classList.add('show')
      document.getElementsByClassName('timesuccess')[i]?.classList.toggle('lesswidth')
      document.getElementsByClassName('cont-btns-alert')[i]?.classList.add('show')

setTimeout(function(){
  document.getElementsByClassName('message')[i]?.classList.remove('show')
  document.getElementsByClassName('cont-btns-alert')[i]?.classList.remove('show')
  document.getElementsByClassName('container-alert')[i]?.classList.remove('show')
  document.getElementsByClassName('timesuccess')[i]?.classList.remove('lesswidth')
},2000)
}
}
async obtenerUnete(){
  const data = await this.uneterService.otenerUneteEquipo();
  this.dataUnete = data.unete
  console.log(data)
  }


  obtenerItemd(index:any){
  console.log(index)
  }


generarSub() { const newSubIndex = this.subsArray.length + 1; this.subsArray.push(newSubIndex) }
eliminarUltimoSub() { if (this.subsArray.length > 0) { this.subsArray.pop() } }

SaveFunctions(){ document.getElementById('cont-modal-inputs')?.classList.toggle('show') }

}
