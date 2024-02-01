import { Component, OnInit, inject } from '@angular/core';
import { UbicacionServiceService } from '../../services/ubicacion-service.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MostrarPorUbiPipe } from '../../pipes/mostrar-por-ubi.pipe';


@Component({
  selector: 'app-admin-ubicaciones',
  templateUrl: './admin-ubicaciones.component.html',
  styleUrl: './admin-ubicaciones.component.css'
})
export class AdminUbicacionesComponent implements OnInit {
[x: string]: any;

ubicacionService = inject(UbicacionServiceService)
dataUbicacion
fornularioAgregarUbicacion : FormGroup
formularioEditUbicacion: FormGroup
private fileTmp:any
private fileTmpEdit: any
nombreTiendaFiltro: string = ''; 


//Datos para el modal de editar

idUbicacion:any

nombreTienda:any
descripcion:any
codenadasLng:any
codenadaslat:any
tipoTienda:any
imgPath:any


constructor (){
  this.fornularioAgregarUbicacion = new FormGroup({
    tipoTienda: new FormControl(),
    nombreTienda: new FormControl(),
    codenadasLng: new FormControl(),
    codenadaslat: new FormControl(),
    descripcion: new FormControl(),
  })
  this.formularioEditUbicacion  = new FormGroup({
    tipoTienda: new FormControl(),
    nombreTienda: new FormControl(),
    codenadasLng: new FormControl(),
    codenadaslat: new FormControl(),
    descripcion: new FormControl(),
  })
}

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

    // if(nombre!=="" && tipo!=="" && lat!=="" && log!=="" && archivo?.name!==""){

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

    const body = new FormData()

    if(this.fileTmp){
      body.append('imgPath', this.fileTmp.fileRaw, this.fileTmp.fileName);
      body.append('tipoTienda', this.fornularioAgregarUbicacion.value.tipoTienda)
      body.append('nombreTienda',this.fornularioAgregarUbicacion.value.nombreTienda)
      body.append('codenadasLng',this.fornularioAgregarUbicacion.value.codenadasLng)
      body.append('codenadaslat',this.fornularioAgregarUbicacion.value.codenadaslat)
      body.append('descripcion',this.fornularioAgregarUbicacion.value.descripcion)

    }else{
      body.append('tipoTienda', this.fornularioAgregarUbicacion.value.tipoTienda)
      body.append('nombreTienda',this.fornularioAgregarUbicacion.value.nombreTienda)
      body.append('codenadasLng',this.fornularioAgregarUbicacion.value.codenadasLng)
      body.append('codenadaslat',this.fornularioAgregarUbicacion.value.codenadaslat)
      body.append('descripcion',this.fornularioAgregarUbicacion.value.descripcion)
    }

    console.log(this.fornularioAgregarUbicacion.value.fecha)
    this.ubicacionService.CrearUbicacion(body)
    .subscribe(res =>{console.log(res), this.obtenerUbicacion(),this.fileTmp = null})
    this.MessageSuccess('Datos guardados exitosamente',6)

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
// }else{this.MessageSuccess("Los campos requeridos no pueden estar vacíos",0)}

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

getFile($event: any): void {
  //TODO esto captura el archivo!
  const [ file ] = $event.target.files;
  this.fileTmp = {
    fileRaw:file,
    fileName:file.name
  }
}

sendFile():void{

  const body = new FormData()

  if(this.fileTmp){
    body.append('imgPath', this.fileTmp.fileRaw, this.fileTmp.fileName);
    body.append('tipoTienda', this.fornularioAgregarUbicacion.value.tipoTienda)
    body.append('nombreTienda',this.fornularioAgregarUbicacion.value.nombreTienda)
    body.append('codenadasLng',this.fornularioAgregarUbicacion.value.codenadasLng)
    body.append('codenadaslat',this.fornularioAgregarUbicacion.value.codenadaslat)
    body.append('descripcion',this.fornularioAgregarUbicacion.value.descripcion)

  }else{
    body.append('tipoTienda', this.fornularioAgregarUbicacion.value.tipoTienda)
    body.append('nombreTienda',this.fornularioAgregarUbicacion.value.nombreTienda)
    body.append('codenadasLng',this.fornularioAgregarUbicacion.value.codenadasLng)
    body.append('codenadaslat',this.fornularioAgregarUbicacion.value.codenadaslat)
    body.append('descripcion',this.fornularioAgregarUbicacion.value.descripcion)
  }

  console.log(this.fornularioAgregarUbicacion.value.fecha)
  this.ubicacionService.CrearUbicacion(body)
  .subscribe(res =>{console.log(res), this.obtenerUbicacion(),this.fileTmp = null})
  this.MessageSuccess('Datos guardados exitosamente',6)
}

getFileEdit($event: any): void {
  //TODO esto captura el archivo!
  const [ file ] = $event.target.files;
  this.fileTmpEdit = {
    fileRaw:file,
    fileName:file.name
  }
}

sendFileEdit():void{

  const body = new FormData()

  if(this.fileTmpEdit){
    body.append('imgPath', this.fileTmpEdit.fileRaw, this.fileTmpEdit.fileName);
    body.append('tipoTienda', this.formularioEditUbicacion.value.tipoTienda)
    body.append('nombreTienda',this.formularioEditUbicacion.value.nombreTienda)
    body.append('codenadasLng',this.formularioEditUbicacion.value.codenadasLng)
    body.append('codenadaslat',this.formularioEditUbicacion.value.codenadaslat)
    body.append('descripcion',this.formularioEditUbicacion.value.descripcion)

  }else{
    body.append('tipoTienda', this.formularioEditUbicacion.value.tipoTienda)
    body.append('nombreTienda',this.formularioEditUbicacion.value.nombreTienda)
    body.append('codenadasLng',this.formularioEditUbicacion.value.codenadasLng)
    body.append('codenadaslat',this.formularioEditUbicacion.value.codenadaslat)
    body.append('descripcion',this.formularioEditUbicacion.value.descripcion)
  }

  console.log(this.formularioEditUbicacion.value.fecha)
  this.ubicacionService.sendEdit(body,this.idUbicacion)
  .subscribe(res =>{console.log(res), this.obtenerUbicacion(),this.fileTmpEdit = null})
  this.MessageSuccess('Datos guardados exitosamente',6)
}


async ObtenerUbixId(id){
  const Ubicacion = await this.ubicacionService.ObtenerUbicaionesxid(id)
  this.idUbicacion = Ubicacion.ubi._id
  this.tipoTienda = Ubicacion.ubi.tipoTienda
  this.nombreTienda = Ubicacion.ubi.nombreTienda
  this.codenadasLng = Ubicacion.ubi.codenadasLng
  this.codenadaslat = Ubicacion.ubi.codenadaslat
  this.descripcion = Ubicacion.ubi.descripcion
  this.imgPath =Ubicacion.ubi.imgPath
  
  console.log(Ubicacion)
  console.log(this.descripcion)


}

editLocation(){ 
  

  
  document.getElementById('modal-edit-location')?.classList.toggle('toggle') }


}



