import { Component, inject, ViewChild } from '@angular/core';
import { UneteEquipoService } from '../../services/unete-equipo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  srcPreviewAdd
  srcPreviewEdit
  containerAlert: HTMLElement | any
  widthLimit
  heightLimit
  sizeLimit
  

  data:any

  NombrePlaza:any
  UbicacionPlaza:any
  DepartamentoPlaza:any
  EmpresaPlaza:any
  EducacionPlaza:any
  ExperienciaPlaza:any
  FechaPlaza:any
  fecha:any
  idPlaza:any
  funciones:any

  formAgregarFuncion: FormGroup
  fomrumarioAgregarPlaza : FormGroup
  formAgregarPlaza: FormGroup
  formEditarPlaza: FormGroup
  formEditarFuncion:FormGroup



  private fileTmp:any;
  private fileTmpFileEdit:any;
  $element: MouseEvent | any


constructor(){
  this.formAgregarFuncion = new FormGroup({
    funcion: new FormControl(),
  })

  this.formAgregarPlaza = new FormGroup({
    ubicacion : new FormControl(),
    departamento : new FormControl(),
    empresa : new FormControl(),
    educacion : new FormControl(),
    experiencia : new FormControl(),
    titulo : new FormControl(),
    formulario : new FormControl(),
  })
  this.fomrumarioAgregarPlaza = new FormGroup({
    ubicacion : new FormControl(),
    departamento : new FormControl(),
    empresa : new FormControl(),
    fecha : new FormControl(),
    educacion : new FormControl(),
    experiencia : new FormControl(),
    titulo : new FormControl(),
  })

  this.formEditarPlaza = new FormGroup({
    ubicacion : new FormControl(),
    departamento : new FormControl(),
    empresa : new FormControl(),
    fecha : new FormControl(),
    educacion : new FormControl(),
    experiencia : new FormControl(),
    titulo : new FormControl(),
  })


  this.formEditarFuncion = new FormGroup({
    funciones: new FormControl(),
  })
}
  ngOnInit(): void {
    this.containerAlert = document.getElementById('background-alert')
    this.obtenerUnete()
  }

  ModalProduct(type:string){
    document.getElementById(type)?.classList.toggle('toggle')
    document.getElementById('cont-modal-inputs')?.classList.remove('show')
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

SaveFunctions(){ }

ModalEditFunctions() { document.getElementById('modal-edit-fns')?.classList.toggle('show') }

DeleteFunction(){

}


ModalFunctions(i:number){ document.getElementsByClassName('fns-add')[i]?.classList.toggle('show') }


async NuevaPlaza(){
  const rest =  await this.uneterService.crearUneteEquipo(this.formAgregarPlaza.value)
  console.log(rest)

}




agregarPlaza():void{

  const body = new FormData()

  if(this.fileTmp){
    body.append('imagePath', this.fileTmp.fileRaw, this.fileTmp.fileName)
    body.append('titulo', this.fomrumarioAgregarPlaza.value.titulo)
    body.append('ubicacion', this.fomrumarioAgregarPlaza.value.ubicacion)
    body.append('departamento',this.fomrumarioAgregarPlaza.value.departamento)
    body.append('empresa',this.fomrumarioAgregarPlaza.value.empresa)
    body.append('educacion',this.fomrumarioAgregarPlaza.value.educacion)
    body.append('experecia',this.fomrumarioAgregarPlaza.value.experiencia)
    body.append('fecha',this.fomrumarioAgregarPlaza.value.fecha)


  }else{
    body.append('titulo', this.fomrumarioAgregarPlaza.value.titulo)
    body.append('ubicacion', this.fomrumarioAgregarPlaza.value.ubicacion)
    body.append('departamento',this.fomrumarioAgregarPlaza.value.departamento)
    body.append('empresa',this.fomrumarioAgregarPlaza.value.empresa)
    body.append('educacion',this.fomrumarioAgregarPlaza.value.educacion)
    body.append('experecia',this.fomrumarioAgregarPlaza.value.experiencia)
    body.append('fecha',this.fomrumarioAgregarPlaza.value.fecha)

  }
  this.uneterService.sendCreatePlaza(body)


  .subscribe(res =>{console.log(res),  console.log(body), this.obtenerUnete(),this.fileTmp = null})

}

EditPlaza():void{

  const body = new FormData()

  if(this.fileTmp){
    body.append('imagePath', this.fileTmp.fileRaw, this.fileTmp.fileName)
    body.append('titulo', this.fomrumarioAgregarPlaza.value.titulo)
    body.append('ubicacion', this.fomrumarioAgregarPlaza.value.ubicacion)
    body.append('departamento',this.fomrumarioAgregarPlaza.value.departamento)
    body.append('empresa',this.fomrumarioAgregarPlaza.value.empresa)
    body.append('educacion',this.fomrumarioAgregarPlaza.value.educacion)
    body.append('experecia',this.fomrumarioAgregarPlaza.value.experiencia)
    body.append('fecha',this.fomrumarioAgregarPlaza.value.fecha)


  }else{
    body.append('titulo', this.fomrumarioAgregarPlaza.value.titulo)
    body.append('ubicacion', this.fomrumarioAgregarPlaza.value.ubicacion)
    body.append('departamento',this.fomrumarioAgregarPlaza.value.departamento)
    body.append('empresa',this.fomrumarioAgregarPlaza.value.empresa)
    body.append('educacion',this.fomrumarioAgregarPlaza.value.educacion)
    body.append('experecia',this.fomrumarioAgregarPlaza.value.experiencia)
    body.append('fecha',this.fomrumarioAgregarPlaza.value.fecha)

  }
  this.uneterService.sendEditPlaza(this.idPlaza,body)


  .subscribe(res =>{console.log(res),  console.log(body), this.obtenerUnete(),this.fileTmp = null})

}



/**
 * Sends a file to create a plaza.
 */

 



sendFileplaza(): void {
  this.AlertOption("¿Desea guardar la nueva plaza?")
  const parent: HTMLElement | any = this.containerAlert
  const btn: HTMLElement | any = parent?.childNodes[0]?.childNodes[0]?.childNodes[1]?.childNodes[0]
  
  if (btn) { btn.onclick = () => {
    const body = new FormData()
    if(this.fileTmp){
      body.append('imgPath', this.fileTmp.fileRaw, this.fileTmp.fileName)
      body.append('titulo', this.formAgregarPlaza.value.titulo)
      body.append('ubicacion', this.formAgregarPlaza.value.ubicacion)
      body.append('departamento',this.formAgregarPlaza.value.departamento)
      body.append('empresa',this.formAgregarPlaza.value.empresa)
      body.append('educacion',this.formAgregarPlaza.value.educacion)
      body.append('experecia',this.formAgregarPlaza.value.experiencia)
      body.append('fecha',this.formAgregarPlaza.value.fecha)
      console.log('con imagen')
  
    }else{
      console.log('sin img')
      body.append('titulo', this.formAgregarPlaza.value.titulo)
      body.append('ubicacion', this.formAgregarPlaza.value.ubicacion)
      body.append('departamento',this.formAgregarPlaza.value.departamento)
      body.append('empresa',this.formAgregarPlaza.value.empresa)
      body.append('educacion',this.formAgregarPlaza.value.educacion)
      body.append('experecia',this.formAgregarPlaza.value.experiencia)
      body.append('fecha',this.formAgregarPlaza.value.fecha)
  }
  
    this.uneterService.sendCreatePlaza(body)
    .subscribe(res => {console.log(res), console.log(body) ,this.formAgregarPlaza.reset(),this.obtenerUnete(),this.fileTmp = null, this.AlertMessage('¡Plaza guardada exitosamente!', 1500)})
  }
}


}

sendFileEditplaza(id:any): void {
  this.AlertOption("¿Desea guardar la nueva plaza?")
  const parent: HTMLElement | any = this.containerAlert
  const btn: HTMLElement | any = parent?.childNodes[0]?.childNodes[0]?.childNodes[1]?.childNodes[0]
  
  if (btn) { btn.onclick = () => {
    const body = new FormData()
    if(this.fileTmpFileEdit){
      body.append('imgPath', this.fileTmpFileEdit.fileRaw, this.fileTmpFileEdit.fileName)
      body.append('titulo', this.formAgregarPlaza.value.titulo)
      body.append('ubicacion', this.formAgregarPlaza.value.ubicacion)
      body.append('departamento',this.formAgregarPlaza.value.departamento)
      body.append('empresa',this.formAgregarPlaza.value.empresa)
      body.append('educacion',this.formAgregarPlaza.value.educacion)
      body.append('experecia',this.formAgregarPlaza.value.experiencia)
      body.append('fecha',this.formAgregarPlaza.value.fecha)
      console.log('con imagen')
  
    }else{
      console.log('sin img')
      body.append('titulo', this.formAgregarPlaza.value.titulo)
      body.append('ubicacion', this.formAgregarPlaza.value.ubicacion)
      body.append('departamento',this.formAgregarPlaza.value.departamento)
      body.append('empresa',this.formAgregarPlaza.value.empresa)
      body.append('educacion',this.formAgregarPlaza.value.educacion)
      body.append('experecia',this.formAgregarPlaza.value.experiencia)
      body.append('fecha',this.formAgregarPlaza.value.fecha)
  }
  
    this.uneterService.sendEditPlaza(id ,body)
    .subscribe(res => {console.log(res), console.log(body) ,this.obtenerUnete(), this.AlertMessage('¡Plaza guardada exitosamente!', 1500)})
  }
}


}



async crearPlaza(){
  const respuestaCrearNoticia = await this.uneterService.crearUneteEquipo(this.fomrumarioAgregarPlaza.value)
  console.log(respuestaCrearNoticia)
  this.obtenerUnete()
 }


async agregarfuncion(id:any){
  const respuestaAgregarFuncion = await this.uneterService.agregarFunciones(id,this.formAgregarFuncion.value)
  console.log(respuestaAgregarFuncion)
  this.obtenerUnete()
  this.formAgregarFuncion.reset()

}



async obtenerPlazaId(id:any){
  const respuestaid = await this.uneterService.ObtenerPlazaid(id)
  console.log(respuestaid)
  this.NombrePlaza = respuestaid.plaza.titulo
  this.UbicacionPlaza = respuestaid.plaza.ubicacion
  this.DepartamentoPlaza = respuestaid.plaza.departamento
  this.EmpresaPlaza = respuestaid.plaza.empresa
  this.EducacionPlaza = respuestaid.plaza.educacion
  this.ExperienciaPlaza = respuestaid.plaza.experecia
  this.FechaPlaza = respuestaid.plaza.fecha
  this.fecha = respuestaid.plaza.fecha
  this.idPlaza = respuestaid.plaza._id
  this.data = respuestaid.plaza
  this.funciones = respuestaid.plaza.funciones
  console.log(this.NombrePlaza)
  this.obtenerFunciones()
}



async editarPlaza(){
  try{
    let id = this.idPlaza
    await this.uneterService.editarPlaza(id,this.formEditarPlaza.value)
    this.obtenerUnete()
    this.AlertMessage("¡Datos actualizados exitosamente!", 1500)
  } catch(error) {
    console.log(error)
    this.AlertMessage("Error :(", 1500)
  }
}

async eliminarPlaza(id:any){
  const respuestaEliminarPlaza = await this.uneterService.eliminarPlaza(id)
  console.log(respuestaEliminarPlaza)
  this.obtenerUnete()
}

async obtenerFunciones(){
 this.funciones =  this.data.funciones
  console.log(this.funciones)
}

obtenerIndiceFunciones(indice:any){

console.log(indice)

console.log(this.formEditarFuncion.value)
}

async editarFuncion(indice:any){
  let id = this.idPlaza
  const respuestaEditarFuncion = await this.uneterService.editarFuncion(indice,this.formEditarFuncion.value,id)
  console.log(respuestaEditarFuncion)
  this.obtenerUnete()
  this.formEditarFuncion.reset()
 this.obtenerFunciones()
 this.obtenerPlazaId(id)
  console.log(this.formEditarFuncion.value)
}

async eliminarFuncion(indice:any){
  let id = this.idPlaza
  const respuestaEliminarFuncion = await this.uneterService.eliminarFuncion(id,indice)
  console.log(respuestaEliminarFuncion)
  this.obtenerUnete()
  this.obtenerFunciones()
  this.obtenerPlazaId(id)
}




async eliminarId(id: number){
  try {
    const respuestaEliminarPlaza = await this.uneterService.eliminarPlaza(id)
    console.log(respuestaEliminarPlaza)
    this.AlertMessage('¡Plaza eliminada!',1500)
    this.obtenerUnete()
  } catch (error) {
    console.log(error)
    this.AlertMessage('Error :(',1500)
}
}


Edit() {
  let id = this.idPlaza
  this.AlertOption("¿Desea guardar los cambios?")
  const parent: HTMLElement | any = this.containerAlert
  const btn: HTMLElement | any = parent?.childNodes[0]?.childNodes[0]?.childNodes[1]?.childNodes[0]

  if (btn) { btn.onclick = () => { this.editarPlaza() } }
}



closeAlert(event: MouseEvent){
  const node = event.target as HTMLElement | null
  const parent = node?.parentNode?.parentNode?.parentNode as HTMLElement | undefined
  parent?.classList.remove('show')
  const inner = parent?.childNodes[0]?.childNodes[0] as HTMLElement | undefined
  const btns = parent?.childNodes[0]?.childNodes[2] as HTMLElement | undefined
  inner?.classList.remove('show')
  inner!.innerHTML = ""
  btns?.classList.remove('show')
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

EliminarP(id: number) {
  this.AlertOption("¿Desea eliminar el producto seleccionado?")
  const parent: HTMLElement | any = this.containerAlert
  const btn: HTMLElement | any = parent?.childNodes[0]?.childNodes[0]?.childNodes[1]?.childNodes[0]

  if (btn) { 
    btn.onclick = () => {
          this.eliminarId(id)
    }
  }

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








