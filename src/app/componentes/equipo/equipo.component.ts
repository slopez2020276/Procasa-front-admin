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


  private fileTmp:any;


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
}
  ngOnInit(): void {
    this.obtenerUnete()
  }

  ModalProduct(type:string){
    document.getElementById(type)?.classList.toggle('show')
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

  FileEdit(event: Event): void {
    const fileInput = event.target as HTMLInputElement
    const archivo = fileInput.files?.[0]
    if (archivo) {

      const lector = new FileReader()

      lector.onload = (eventoLectura:any) => {
        console.log(eventoLectura)
        const imagen = new Image()
        imagen.src = eventoLectura.target.result
          this.srcPreviewEdit = imagen.src
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
          this.inputEmptyB = fileName

          document.getElementById('innersize-edit')!.innerHTML = sizemedida
          document.getElementById('innerwidth-edit')!.innerHTML = imagen.width + " px"
          document.getElementById('innerheight-edit')!.innerHTML = imagen.height + " px"
          document.getElementById('img-pre-edit')?.setAttribute('src', fileName)
        }
      }
      lector.readAsDataURL(archivo)
    }
  }







  FileAdd(event: Event): void {
    const fileInput = event.target as HTMLInputElement
    const archivo = fileInput.files?.[0]
    if (archivo) {

      const lector = new FileReader()

      lector.onload = (eventoLectura:any) => {
        console.log(eventoLectura)
        const imagen = new Image()
        imagen.src = eventoLectura.target.result
          this.srcPreviewAdd = imagen.src
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
          this.inputEmpty = fileName

          document.getElementById('innersize-add')!.innerHTML = sizemedida
          document.getElementById('innerwidth-add')!.innerHTML = imagen.width + " px"
          document.getElementById('innerheight-add')!.innerHTML = imagen.height + " px"
          document.getElementById('img-pre-tl')?.setAttribute('src', img.src)
        }
      }
      lector.readAsDataURL(archivo)
    }
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
    body.append('imgPhat', this.fileTmp.fileRaw, this.fileTmp.fileName)
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



/**
 * Sends a file to create a plaza.
 */
sendFileplaza():void{

  const body = new FormData()
  if(this.fileTmp){
    body.append('imgPhat', this.fileTmp.fileRaw, this.fileTmp.fileName)
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
  .subscribe(res => {console.log(res), console.log(body) ,this.formAgregarPlaza.reset(),this.obtenerUnete(),this.fileTmp = null})
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
  console.log(this.NombrePlaza)

}



async editarPlaza(){
  let id = this.idPlaza
    console.log(this.idPlaza)
  const respuestaEditarPlaza = await this.uneterService.editarPlaza(id,this.formEditarPlaza.value)
  console.log(respuestaEditarPlaza)
  this.obtenerUnete()
}


async obtenerFunciones(){
 this.funciones =  this.data.funciones
  console.log(this.funciones)

}



async eliminarId(id: number, i:any){
  try {
    const respuestaEliminarPlaza = await this.uneterService.eliminarPlaza(id)
    console.log(respuestaEliminarPlaza)
    this.obtenerUnete()
  } catch (error) {
    console.log(error)
    this.MessageSuccess('Error al eliminar plaza', i)
}
}


async AlertConfirm(event: MouseEvent) {
  const node = event.target as HTMLElement | null
  const parent = node?.parentNode?.parentNode?.parentNode?.children[3] as HTMLElement | undefined
  parent?.classList.add('show')
  const inner = parent?.childNodes[0]?.childNodes[0] as HTMLElement | undefined
  const btns = parent?.childNodes[0]?.childNodes[2] as HTMLElement | undefined
  inner?.classList.add('show')
  inner!.innerHTML = "¿Desea eliminar la plaza?"
  btns?.classList.add('show')
}


async Edit(event: MouseEvent) {
      let id = this.idPlaza

  const node = event.target as HTMLElement | null
  const parent = node?.parentNode?.parentNode?.parentNode?.childNodes[4] as HTMLElement | undefined

  parent?.classList.add('show')
  const inner = parent?.childNodes[0]?.childNodes[0] as HTMLElement | undefined
  const btns = parent?.childNodes[0]?.childNodes[2] as HTMLElement | undefined
  inner?.classList.add('show')
  inner!.innerHTML = "¿Desea guardar los cambios?"
  btns?.classList.add('show')

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



}

