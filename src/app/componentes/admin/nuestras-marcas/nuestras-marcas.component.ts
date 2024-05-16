import { Component, OnInit, inject } from '@angular/core';
import { MarcasService } from '../../../services/marcas.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-nuestras-marcas',
  templateUrl: './nuestras-marcas.component.html',
  styleUrl: './nuestras-marcas.component.css'
})
export class NuestrasMarcasComponent implements OnInit {
  containerAlert: HTMLElement | any
  widthLimit
  heightLimit
  sizeLimit
  private fileTmp:any
  private fileTmpFileEdit:any
  imgMarcas

  private fileTmpReal:any
  private fileTmpEditReal: any

  formularioAgregarMarca: FormGroup
  formularioEditarMarca: FormGroup
  $element: MouseEvent | any

  MarcasServices = inject(MarcasService)
  dataMarcas:any

  marcaid
  textMarca

  constructor() { 
    this.formularioAgregarMarca = new FormGroup({
      textMarca: new FormControl(),
     
    })
    this.formularioEditarMarca = new FormGroup({
      textMarca: new FormControl(),
    })
  }

  ModalProduct(type:string){
    document.getElementById(type)?.classList.toggle('toggle')
    document.getElementById('cont-modal-inputs')?.classList.remove('show')
   }



ModalEditFunctions() { document.getElementById('modal-edit-marca')?.classList.toggle('toggle') }
ModalAddFunctions() { document.getElementById('modal-add-marca')?.classList.toggle('toggle') }




getFileReal($event: any): void {
  const [ file ] = $event.target.files
  this.fileTmp = {
    fileRaw:file,
    fileName:file.name
  }
}

getFileEditReal($event: any): void {
  const [ file ] = $event.target.files
  this.fileTmpEditReal = {
    fileRaw:file,
    fileName:file.name
  }
}


sendFile():void{
  this.AlertOption("¿Guardar la nueva Marca?")
  const parent: HTMLElement | any = this.containerAlert
  const btn: HTMLElement | any = parent?.childNodes[0]?.childNodes[0]?.childNodes[1]?.childNodes[0]

  btn.onclick = () => {
  const body = new FormData()
console.log(body)

  if(this.fileTmp){
    body.append('imgPath', this.fileTmp.fileRaw, this.fileTmp.fileName)
    body.append('textMarca', this.formularioAgregarMarca.value.textMarca)
  }else{
    body.append('textMarca', this.formularioAgregarMarca.value.textMarca)
  }

  this.MarcasServices.CrearMarca(body)
  .subscribe(res =>{
    this.formularioAgregarMarca.reset()
    console.log(res), this.obtenerMarcas()})
  }
}


sendFileEditReal():void{
  this.AlertOption("¿Guardar cambios de Marca?")
  const parent: HTMLElement | any = this.containerAlert
  const btn: HTMLElement | any = parent?.childNodes[0]?.childNodes[0]?.childNodes[1]?.childNodes[0]

  btn.onclick = () => {


  const body = new FormData()
console.log(body)

  if(this.fileTmpEditReal){
    body.append('imgPath', this.fileTmpEditReal.fileRaw, this.fileTmpEditReal.fileName)
    body.append('textMarca', this.formularioEditarMarca.value.textMarca)
  }else{ body.append('textMarca', this.formularioEditarMarca.value.textMarca) }


  if (btn) {
          this.MarcasServices.editarMarca(this.marcaid,body)
          .subscribe(res =>{
            this.formularioEditarMarca.reset()
            console.log(res), this.obtenerMarcas()})
}
}
}





async obtenermarcaId(id:any){
  const respuesta = await this.MarcasServices.ObtenerMarcaId(id)
  console.log(respuesta)
  this.marcaid = respuesta._id
  this.textMarca = respuesta.textMarca
  this.imgMarcas = respuesta.imgPath
}


async ngOnInit(){
this.containerAlert = document.getElementById('background-alert')
  this.obtenerMarcas()
}

async obtenerMarcas(){
  const respuesta = await this.MarcasServices.obtenerMarcas()
  this.dataMarcas = respuesta.marcas
  console.log(this.dataMarcas)
}


getFile($event: any): void {
  //TODO esto captura el archivo!
  const [ file ] = $event.target.files;
  this.fileTmp = {
    fileRaw:file,
    fileName:file.name
  }
}

getFileEdit($event: any): void {
  //TODO esto captura el archivo!
  const [ file ] = $event.target.files;
  this.fileTmpFileEdit = {
    fileRaw:file,
    fileName:file.name
  }
}

async eliminarMarca(id:any){
  this.AlertOption("¿Desea eliminar la Marca seleccionada?")
  const parent: HTMLElement | any = this.containerAlert
  const btn: HTMLElement | any = parent?.childNodes[0]?.childNodes[0]?.childNodes[1]?.childNodes[0]
  
          if (btn) { btn.onclick = async () => {
              this.AlertMessage("Marca eliminada con éxito", 1500)
              const respuesta = await this.MarcasServices.eliminarMarca(id)
              console.log(respuesta)
              this.obtenerMarcas()
            }}
}






clearInputs() {
  const fileInputs:HTMLElement | any = document.getElementsByClassName('to-clean')

  for (let i = 0; i < fileInputs.length; i++) {
    const fileInput = fileInputs[i]
    const parent: HTMLElement | any = fileInput?.parentElement?.parentElement?.parentElement


    if (parent) {
      const widthInner: HTMLElement | any = parent.children[0].children[1].children[0].children[0]
      const heightInner: HTMLElement | any = parent.children[0].children[1].children[1].children[0]
      const sizeInner: HTMLElement | any = parent.children[0].children[1].children[2].children[0]
      const attr: HTMLElement | undefined = parent.children[0].children[0].children[0]
      const img: HTMLElement | undefined = parent.children[1].children[0]

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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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
