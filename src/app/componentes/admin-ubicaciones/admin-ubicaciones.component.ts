import { Component, OnInit, inject } from '@angular/core';
import { UbicacionServiceService } from '../../services/ubicacion-service.service';

@Component({
  selector: 'app-admin-ubicaciones',
  templateUrl: './admin-ubicaciones.component.html',
  styleUrl: './admin-ubicaciones.component.css'
})
export class AdminUbicacionesComponent implements OnInit {

ubicacionService = inject(UbicacionServiceService)
dataUbicacion

ngOnInit(): void {
  this.obtenerUbicacion()
}

async obtenerUbicacion(){
  const ubicacion = await this.ubicacionService.ObtenerUbicaionesAdmin()
  console.log(ubicacion.ubi)
  this.dataUbicacion = ubicacion.ubi
}

InputChange(event: Event) {
  const fileInput = event.target as HTMLInputElement
  const archivo = fileInput.files?.[0]

  if (archivo) { const lector = new FileReader()
      lector.onload = (eventoLectura:any) => {
      const imagen = new Image()
      imagen.src = eventoLectura.target.result as string

      imagen.onload = () => {
        const fileSize: number = archivo.size
        const size: any = fileSize.toFixed(2)
        let medida: string
        let sizemedida: any
        if((size/1024/1024) < 1.0) {medida = " KB"; sizemedida = (size/1024).toFixed(2).toString() + medida }else{ medida = " MB"; sizemedida = (size/1024/1024).toFixed(2).toString() + medida }
        const fileName: string = archivo.name
        let img = new Image()
        const objectURL = URL.createObjectURL(archivo)
        img.src = objectURL

        document.getElementsByClassName('danger-red')[0]?.classList.remove('limit')
        document.getElementsByClassName('danger-red')[1]?.classList.remove('limit')
        document.getElementsByClassName('danger-red')[2]?.classList.remove('limit')

        if(imagen.width > 2000){  document.getElementsByClassName('danger-red')[0].classList.add('limit') }
        if(imagen.height > 1500){ document.getElementsByClassName('danger-red')[1].classList.add('limit') }
        if((size/1024) > 2048 ){  document.getElementsByClassName('danger-red')[2].classList.add('limit') }

        document.getElementsByClassName('danger-red')[2]!.innerHTML = sizemedida
        document.getElementsByClassName('danger-red')[0]!.innerHTML = imagen.width + " px"
        document.getElementsByClassName('danger-red')[1]!.innerHTML = imagen.height + " px"
        document.getElementById('fileimg')?.setAttribute('data-content', fileName)
        document.getElementById('prefileimg')?.removeAttribute('src')
        // document.getElementById('fileimg')?.removeAttribute('src')
        document.getElementById('prefileimg')?.setAttribute('src', img.src)
        // document.getElementById('pre-bg')?.setAttribute('src', img.src)
        // document.getElementById('endpreview-bg')?.setAttribute('src', img.src)
      }
    }
    lector.readAsDataURL(archivo)
  }

document.getElementById('save-modal')?.addEventListener('click', () => {
  const nombreinput: HTMLInputElement | null = document.getElementById('name') as HTMLInputElement
  const tipoinput: HTMLInputElement | null = document.getElementById('type') as HTMLInputElement
  const latinput: HTMLInputElement | null = document.getElementById('lat') as HTMLInputElement
  const loginput: HTMLInputElement | null = document.getElementById('log') as HTMLInputElement
  let nombre: string = ''
  let tipo: string = ''
  let lat: string = ''
  let log: string = ''

  if (nombreinput instanceof HTMLInputElement) { nombre = nombreinput.value }
  if (tipoinput instanceof HTMLInputElement) { tipo = tipoinput.value }
  if (latinput instanceof HTMLInputElement) { lat = latinput.value }
  if (loginput instanceof HTMLInputElement) { log = loginput.value }

    if(nombre!=="" && tipo!=="" && lat!=="" && log!=="" && archivo?.name!==""){

  const innerMessage = document.getElementsByClassName('innermsg')[0]
  if (innerMessage) { innerMessage.innerHTML = "¿Desea guardar los datos?"

  document.getElementsByClassName('container-alert')[0]?.classList.add('show')
  document.getElementsByClassName('message')[0]?.classList.add('show')
  document.getElementsByClassName('cont-btns-alert')[0]?.classList.add('show')

  document.getElementsByClassName('cancel')[0]?.addEventListener('click', function(){
    document.getElementsByClassName('container-alert')[0]?.classList.remove('show')
    document.getElementsByClassName('message')[0]?.classList.remove('show')
    document.getElementsByClassName('cont-btns-alert')[0]?.classList.remove('show')
  },false)
  document.getElementsByClassName('confirm')[0]?.addEventListener('click', async () => {
    const response = await this.ubicacionService.CrearUbicacion(this.dataUbicacion)
    if(response) { this.MessageSuccess("Datos guardados exitosamente",0) }

      document.getElementsByClassName('container-alert')[0]?.classList.remove('show')
      document.getElementsByClassName('danger-red')[2]!.innerHTML = "-"
      document.getElementsByClassName('danger-red')[0]!.innerHTML = "-"
      document.getElementsByClassName('danger-red')[1]!.innerHTML = "-"

const nombreEmpty: HTMLInputElement | null = document.getElementById('name') as HTMLInputElement; if (nombreEmpty) { nombreEmpty.value = '' }
const typeEmpty: HTMLInputElement | null = document.getElementById('name') as HTMLInputElement; if (typeEmpty) { typeEmpty.value = '' }
const latEmpty: HTMLInputElement | null = document.getElementById('name') as HTMLInputElement; if (latEmpty) { latEmpty.value = '' }
const logEmpty: HTMLInputElement | null = document.getElementById('name') as HTMLInputElement; if (logEmpty) { logEmpty.value = '' }


      document.getElementById('fileimg')?.setAttribute('data-content', 'seleccionar archivo')
      document.getElementById('prefileimg')?.removeAttribute('src')


  },false)
  }
}else{this.MessageSuccess("Los campos requeridos no pueden estar vacíos",0)}

}, false)

}

AddLocation(){ document.getElementById('modal-add-location')?.classList.toggle('toggle') }

MessageSuccess(text: string, i: number){
  const innermsg = document.getElementsByClassName('innermsg')[i]
  if (innermsg) { innermsg.innerHTML = text
    document.getElementsByClassName('container-alert')[i]?.classList.add('show')
    document.getElementsByClassName('message')[i]?.classList.add('show')
    document.getElementsByClassName('timesuccess')[i]?.classList.toggle('lesswidth')
    setTimeout(() => {
      document.getElementsByClassName('container-alert')[i]?.classList.remove('show')
      document.getElementsByClassName('message')[i]?.classList.remove('show')
      document.getElementsByClassName('timesuccess')[i]?.classList.remove('lesswidth')
  },1500)
}
}

















}



