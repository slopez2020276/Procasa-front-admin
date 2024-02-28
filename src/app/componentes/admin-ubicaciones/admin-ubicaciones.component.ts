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

containerAlert: HTMLElement | any
widthLimit
heightLimit
sizeLimit



constructor (){
  this.fornularioAgregarUbicacion = new FormGroup({
    tipoTienda: new FormControl(),
    direccion: new FormControl(),
    telefono: new FormControl(),
    horario: new FormControl(),
    nombreTienda: new FormControl(),
    descripcion: new FormControl(),
    enlaceMaps: new FormControl(),
    enlaceWaze: new FormControl(),
  })
  this.formularioEditUbicacion  = new FormGroup({
    tipoTienda: new FormControl(),
    direccion: new FormControl(),
    telefono: new FormControl(),
    horario: new FormControl(),
    nombreTienda: new FormControl(),
    descripcion: new FormControl(),
    enlaceMaps: new FormControl(),
    enlaceWaze: new FormControl(),
  })
}

ngOnInit(): void {
  this.containerAlert = document.getElementById('background-alert')
  this.obtenerUbicacion()
}

async obtenerUbicacion(){
  const ubicacion = await this.ubicacionService.ObtenerUbicaionesAdmin()
  console.log(ubicacion.ubi)
  this.dataUbicacion = ubicacion.ubi
}





InputChange(event: Event) {
  this.widthLimit = 1200
  this.heightLimit = 1080
  this.sizeLimit = 2048
  const fileInput = event.target as HTMLInputElement
  const parent: HTMLElement | any = fileInput?.parentElement?.parentElement?.parentElement
  const clean: HTMLElement | any = parent?.children[0]?.children[0]?.children[1]
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
        
        if (parent) {
          const widthInner: HTMLElement | any = parent.children[0].children[1].children[0].children[0]; widthInner.innerHTML = imagen.width + " px"
          const heightInner: HTMLElement | any = parent.children[0].children[1].children[1].children[0]; heightInner.innerHTML = imagen.height + " px"
          const sizeInner: HTMLElement | any = parent.children[0].children[1].children[2].children[0]; sizeInner.innerHTML = sizemedida
          const attr: HTMLElement | undefined = parent.children[0].children[0].children[0]
          const img: HTMLElement | undefined = parent.children[1].children[0]
                      widthInner.classList.remove('limit')
                      heightInner.classList.remove('limit')
                      sizeInner.classList.remove('limit')
                      if(imagen.width > this.widthLimit){ widthInner.classList.add('limit') }
                      if(imagen.height > this.heightLimit){ heightInner.classList.add('limit') }
                      if((size/1024) > this.sizeLimit){ sizeInner.classList.add('limit') }
                      attr?.setAttribute('data-content', fileName)
                      attr?.setAttribute('src', fileName)
                      img?.setAttribute('src', imagen.src)

      clean.onclick = () => {
                widthInner.classList.remove('limit')
                heightInner.classList.remove('limit')
                sizeInner.classList.remove('limit')
            parent.children[0].children[1].children[0].children[0].innerHTML = ''
            parent.children[0].children[1].children[1].children[0].innerHTML = ''
            parent.children[0].children[1].children[2].children[0].innerHTML = ''
            attr?.setAttribute('data-content', 'seleccionar archivo')
            attr?.setAttribute('src', '')
            img?.setAttribute('src', '')
          }
      }
      }
    }
    lector.readAsDataURL(archivo)
  }
}


saveLocation(event: MouseEvent){
  const inImg: HTMLInputElement | any = document.getElementById('imgSave')
  let img: string = inImg.value
  const inNombre: HTMLInputElement | any = document.getElementById('name')
  let nombre: string = inNombre.value
  const inSucursal: HTMLSelectElement | any = document.getElementById('sucursal')
  let sucursal: string = inSucursal.value
  const inTelefono: HTMLInputElement | any = document.getElementById('telefono')
  let telefono: string = inTelefono.value
  const inHorario: HTMLInputElement | any = document.getElementById('horario')
  let horario: string = inHorario.value
  const inMaps: HTMLInputElement | any = document.getElementById('maps')
  let maps: string = inMaps.value
  const inWaze: HTMLInputElement | any = document.getElementById('waze')
  let waze: string = inWaze.value
  const inDesc: HTMLInputElement | any = document.getElementById('descripcion')
  let descripcion: string = inDesc.value

if(img!=="" && nombre!=="" && sucursal!=="" && telefono!=="" && horario!=="" && maps!=="" && waze!=="" && descripcion!==""){
  this.AlertOption("¿Desea guardar la nueva Ubicación?")
    const parent: HTMLElement | any = this.containerAlert
    const btn: HTMLElement | any = parent?.childNodes[0]?.childNodes[0]?.childNodes[1]?.childNodes[0]

  if (btn) { btn.onclick = () => {
      try {
        this.sendFile()
        this.AlertMessage("¡Ubicación guardada exitosamente!", 1500)
      } catch (error) { this.AlertMessage("Error al guardar", 1500) } 
    }
  }
}else{ this.AlertMessage("Todos los campos son requeridos", 1500) }

}




AddLocation(){ document.getElementById('modal-add-location')?.classList.toggle('toggle') }

getFile($event: any): void {
  const [ file ] = $event.target.files
  this.fileTmp = {
    fileRaw:file,
    fileName:file.name
  }
}



sendFile():void{

  const body = new FormData()
console.log(body)

  if(this.fileTmp){
    body.append('imgPath', this.fileTmp.fileRaw, this.fileTmp.fileName);
    body.append('tipoTienda', this.fornularioAgregarUbicacion.value.tipoTienda)
    body.append('nombreTienda',this.fornularioAgregarUbicacion.value.nombreTienda)
    body.append('descripcion',this.fornularioAgregarUbicacion.value.descripcion)
    body.append('direccion',this.fornularioAgregarUbicacion.value.direccion)
    body.append('telefono',this.fornularioAgregarUbicacion.value.telefono)
    body.append('horario',this.fornularioAgregarUbicacion.value.horario)
    body.append('enlaceMaps',this.fornularioAgregarUbicacion.value.enlaceMaps)
    body.append('enlaceWaze',this.fornularioAgregarUbicacion.value.enlaeMaps)

  }else{
    body.append('tipoTienda', this.fornularioAgregarUbicacion.value.tipoTienda)
    body.append('nombreTienda',this.fornularioAgregarUbicacion.value.nombreTienda)
    body.append('descripcion',this.fornularioAgregarUbicacion.value.descripcion)
    body.append('direccion',this.fornularioAgregarUbicacion.value.direccion)
    body.append('telefono',this.fornularioAgregarUbicacion.value.telefono)
    body.append('horario',this.fornularioAgregarUbicacion.value.horario)
    body.append('enlaceMaps',this.fornularioAgregarUbicacion.value.enlaceMaps)
    body.append('enlaceWaze',this.fornularioAgregarUbicacion.value.enlaeMaps)
  }

  this.ubicacionService.CrearUbicacion(body)
  .subscribe(res =>{console.log(res), this.obtenerUbicacion()})

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
    body.append('tipoTienda', this.fornularioAgregarUbicacion.value.tipoTienda)
    body.append('nombreTienda',this.fornularioAgregarUbicacion.value.nombreTienda)
    body.append('descripcion',this.fornularioAgregarUbicacion.value.descripcion)
    body.append('direccion',this.fornularioAgregarUbicacion.value.direccion)
    body.append('telefono',this.fornularioAgregarUbicacion.value.telefono)
    body.append('horario',this.fornularioAgregarUbicacion.value.horario)
    body.append('enlaceMaps',this.fornularioAgregarUbicacion.value.enlaceMaps)
    body.append('enlaceWaze',this.fornularioAgregarUbicacion.value.enlaeMaps)

  }else{
    body.append('tipoTienda', this.fornularioAgregarUbicacion.value.tipoTienda)
    body.append('nombreTienda',this.fornularioAgregarUbicacion.value.nombreTienda)
    body.append('descripcion',this.fornularioAgregarUbicacion.value.descripcion)
    body.append('direccion',this.fornularioAgregarUbicacion.value.direccion)
    body.append('telefono',this.fornularioAgregarUbicacion.value.telefono)
    body.append('horario',this.fornularioAgregarUbicacion.value.horario)
    body.append('enlaceMaps',this.fornularioAgregarUbicacion.value.enlaceMaps)
    body.append('enlaceWaze',this.fornularioAgregarUbicacion.value.enlaeMaps)
  }

  console.log(this.formularioEditUbicacion.value.fecha)
  this.ubicacionService.sendEdit(body,this.idUbicacion)
  .subscribe(res =>{console.log(res), this.obtenerUbicacion()})
}


async ObtenerUbixId(id){
  const Ubicacion = await this.ubicacionService.ObtenerUbicaionesxid(id)
  this.idUbicacion = Ubicacion.ubi._id
  this.tipoTienda = Ubicacion.ubi.tipoTienda
  this.nombreTienda = Ubicacion.ubi.nombreTienda
  this.descripcion = Ubicacion.ubi.descripcion
  this.imgPath =Ubicacion.ubi.imgPath
}

editLocation(){ document.getElementById('modal-edit-location')?.classList.toggle('toggle') }





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// S Y S T E M A      D E     A L E R T A S
AlertOption(message:string) {
  const parent: HTMLElement | any = this.containerAlert
  parent?.classList.add('show')
  const alert: HTMLElement | any = parent?.childNodes[0]
  alert?.classList.add('show')
  const inner: HTMLElement | any = alert?.childNodes[0]?.childNodes[0]
  inner!.innerText = message
  const btns: HTMLElement | any = alert?.childNodes[0]?.childNodes[1]
  btns?.classList.add('show')
}

AlertMessage(message:string, time:number) {
  const parent: HTMLElement | any = this.containerAlert
  parent?.classList.add('show')
  const alert: HTMLElement | any = parent?.childNodes[0]
  alert?.classList.add('show')
  const inner: HTMLElement | any = alert?.childNodes[0]?.childNodes[0]
  inner!.innerText = message
  const btns: HTMLElement | any = alert?.childNodes[0]?.childNodes[1]
  btns?.classList.remove('show')
  setTimeout(() => { this.AlertClose() }, time)
}

AlertClose(){
  const parent: HTMLElement | any = this.containerAlert
  parent?.classList.remove('show')
  const alert: HTMLElement | any = parent?.childNodes[0]
  alert?.classList.remove('show')
  const inner: HTMLElement | any = alert?.childNodes[0]?.childNodes[0]
  inner!.innerText = ""
  const btns: HTMLElement | any = alert?.childNodes[0]?.childNodes[1]
  btns?.classList.remove('show')
}

// P L A N T I L L A      D E      S Y S T E M     A L E R T 
SystemAlert(id: number) {
  this.AlertOption("Message to Show")
  const parent: HTMLElement | any = this.containerAlert
  const btn: HTMLElement | any = parent?.childNodes[0]?.childNodes[0]?.childNodes[1]?.childNodes[0]

  if (btn) { 
    btn.onclick = () => {
          // A C T I O N 
    }
  }
}















}



