import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { HistoriaService } from '../../services/historia.service';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { LineaTiempoService } from '../../services/linea-tiempo.service';
import { empty, timeInterval } from 'rxjs';
import { MisionService } from '../../services/mision.service';
import { NoticasService } from '../../services/noticas.service';
import { ValoresService } from '../../services/valores.service';
import { math } from '@maptiler/sdk';
import { NgOptimizedImage } from '@angular/common';
import { AfterViewInit } from '@angular/core';


interface HtmlInputEvent extends Event {
  target: HTMLInputElement;
}
@Component({
  selector: 'app-adminprincipal',
  templateUrl: './adminprincipal.component.html',
  styleUrl: './adminprincipal.component.css'
})
export class AdminprincipalComponent implements OnInit, AfterViewInit {
  anchoimg:any
  altoimg:any
  desgloce: any|undefined
  formulario: FormGroup
  formularioEditHistoria: FormGroup
  formularioEditlineaTiempo: FormGroup
  formularioMisionValor: FormGroup
  formularioAgregarLineaTiempo:FormGroup
  formularioValores:FormGroup
  formularioEditarNoticias: FormGroup
  formularioAgregarNoticias: FormGroup

  imgPrincipal : any;
  imgfondo:any;

  dataValores
  dataHistoria

  ValoresService = inject(ValoresService)
  historiaService = inject(HistoriaService)
  lineaService = inject(LineaTiempoService)
  misionService = inject(MisionService)
  noticiasService = inject(NoticasService)

  @ViewChild('confirmElement') confirmElement!: ElementRef
  @ViewChild('containerAlertElement') containerAlertElement!: ElementRef
  @ViewChild('confirmElementVal') confirmElementVal!: ElementRef
  @ViewChild('containerAlertElementVal') containerAlertElementVal!: ElementRef
  @ViewChild('confirmElementHis') confirmElementHis!: ElementRef
  @ViewChild('containerAlertElementHis') containerAlertElementHis!: ElementRef
  @ViewChild('confirmElementTL') confirmElementTL!: ElementRef
  @ViewChild('containerAlertElementTL') containerAlertElementTL!: ElementRef
  @ViewChild('containerAlertElementTLEdited') containerAlertElementTLEdited!: ElementRef

  mision:any
  vision:any
  data: any
  dataNoticias:any


  Integridadmodel:any
  PasionModel:any
  InnovacionModel:any
  OrientacionModel:any


  _idhistoria: any
  textoHistoria:any
  EncalceVideo: any

  dataMisionÑ:any
  dataLinea:any
  dataLieneaxId:any
  dataNoticiasxID:any


  imgEditModalLT: any = ''
  tituloModal: string = ''
  descripcionModal: string = ''
  dataLineaRespuesta: any

  tituloNoticia:string = ''
  descripcionNoticia:string = ''

  photoSelected: string | ArrayBuffer | null = null;
file: File | undefined;

private fileTmp:any;
private fileTmpNoticia :any;
private imgPathPrincipal : any;
private fileUpdateLineaTiempo: any;
private fileUpdateNoticia:any;
private fileBackgrud:any

  constructor(){
    this.formulario = new FormGroup({
      DescripcionHistoria: new FormControl(),
      EncalceVideo: new FormControl()
    })

    this.formularioEditlineaTiempo = new FormGroup({
      titleLineaTiempo: new FormControl(),
      descriptionLineaTiempo: new FormControl()
    })
    this.formularioEditHistoria = new FormGroup({
      EncalceVideo: new FormControl(),
      DescripcionHistoria: new FormControl()
    })
    this.formularioMisionValor = new FormGroup({
      textMision: new FormControl(),
      textVIsion: new FormControl()
    })
   this.formularioAgregarLineaTiempo = new FormGroup({
    titleLineaTiempo: new FormControl(),
    descriptionLineaTiempo: new FormControl(),
    image: new FormControl()

    })
    this.formularioValores = new FormGroup({
      Integridad: new FormControl(),
      Pasion: new FormControl(),
      Innovacion: new FormControl(),
      Orientacion: new FormControl(),

      })
    this.formularioEditarNoticias = new FormGroup({
        title: new FormControl(),
        imgPhat: new FormControl(),
        descripcion: new FormControl(),
        })
    this.formularioAgregarNoticias= new FormGroup({
     title: new FormControl(),
     imgPhat: new FormControl(),
     descripcion: new FormControl(),
     })

  }
  ngAfterViewInit(): void {
    this.confirmElement.nativeElement.addEventListener('click', this.onClick.bind(this))
    this.confirmElementVal.nativeElement.addEventListener('click', this.onClickValores.bind(this))
    this.confirmElementHis.nativeElement.addEventListener('click', this.onClickHistoria.bind(this))
    this.confirmElementTL.nativeElement.addEventListener('click', this.onClickNewTimeLine.bind(this))
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  // ENLACE DE VIDEO DE YOUTUBE DE HISTORIA

  IframeVideo() {
    const src: any = (document.getElementById('iframe-value') as HTMLInputElement | null)?.value
          document.getElementById('iframe-preview')?.removeAttribute('src')
          document.getElementById('iframe-preview')?.setAttribute('src', src)
          // console.log(document.getElementById('iframe-preview'))
  }



// SISTEMA DE ALERTAS TYPO COLORES
  MessageAlert(message: string, type: number, time: number){
    document.getElementById('container-alert')?.classList.add('show')
    const innerMessage = document.getElementById('message')
    if (innerMessage) {
      innerMessage.innerHTML = message

      if(type===1){
        document.getElementById('time')?.classList.add('green')
      }else if(type===2){
        document.getElementById('time')?.classList.add('red')
      }else if(type===3){
        document.getElementById('time')?.classList.add('orange')
      }
      setTimeout(function(){
        document.getElementById('container-alert')?.classList.remove('show')
        document.getElementById('time')?.classList.remove('green')
        document.getElementById('time')?.classList.remove('red')
        document.getElementById('time')?.classList.remove('orange')
    },time)
    }
}






// AL INICIAR
  async ngOnInit()  {

      const inputfileBefore: any = (document.getElementById('file-portada') as HTMLInputElement | null)?.value
      const inputfileBefbg: any = (document.getElementById('file-bg') as HTMLInputElement | null)?.value

if(inputfileBefore==""){
    document.getElementById('preview-portada')?.setAttribute('src', "../../../assets/img/empty.jpg")
    document.getElementById('pre-portada')?.setAttribute('src', "../../../assets/img/empty.jpg")
    document.getElementById('file-portada')?.setAttribute('data-content', 'seleccionar archivo')
}
if(inputfileBefbg==""){
    document.getElementById('preview-bg')?.setAttribute('src', "../../../assets/img/empty.jpg")
    document.getElementById('pre-bg')?.setAttribute('src', "../../../assets/img/empty.jpg")
    document.getElementById('file-bg')?.setAttribute('data-content', 'seleccionar archivo')
}

    document.getElementById('deshabilitar')?.classList.add('hide')
    document.getElementById('deshabilitar-mv')?.classList.add('hide')
    document.getElementById('vdeshabilitar')?.classList.add('hide')
    document.getElementById('deshabilitar-hs')?.classList.add('hide')

    const valoresa = document.getElementsByClassName('valores-txt')
    for(let e = 0; e < valoresa.length; e++){ valoresa[e].setAttribute('disabled', 'disabled') }

    this.obtenerHistoria()
    this.obtenerLinea()
    this.obtenerMision()
    this.obtnerNoticias()
    this.obtnerValores()
}

  async obtenerMision(){
    const respuesta = await this.misionService.obtenerMsion()
    this.dataMisionÑ = respuesta.Mision[0]
    this.mision = this.dataMisionÑ.textMision
    this.vision = this.dataMisionÑ.textVIsion

    document.getElementById('mision-txt')?.setAttribute('disabled', 'true')
    document.getElementById('vision-txt')?.setAttribute('disabled', 'true')
  }

  async obtenerHistoria(){
    const responsivehistoria = await this.historiaService.obtenerHistoria()
    this.data = responsivehistoria.historia[0]
    this.textoHistoria = responsivehistoria.historia[0].DescripcionHistoria
    this.EncalceVideo = responsivehistoria.historia[0].EncalceVideo
    this._idhistoria = responsivehistoria.historia[0]._id
    this.imgPrincipal =  responsivehistoria.historia[0].imgPathPrincipal
    this.imgfondo = responsivehistoria.historia[0].imgPathFondo
     console.log(this._idhistoria)

    document.getElementById('iframe-value')?.setAttribute('disabled', 'true')
    document.getElementById('textareaValidate')?.setAttribute('disabled', 'true')
  }

  async obtenerLinea(){
    const repuestaLinea = await this.lineaService.obtenerLineaTiempo()
    this.dataLinea = repuestaLinea[1].lineas
    console.log(this.dataLinea)
  }

// ______________________________________________________________________________________________________________________________________________________________________________________________
// HABILITAR Y DESHABILITAR TEXTARES DE VISION Y MISIÓN
EnableMisionVision(){
  document.getElementById('mision-txt')?.removeAttribute('disabled')
  document.getElementById('vision-txt')?.removeAttribute('disabled')

  document.getElementById('habilitar-mv')?.classList.toggle('hide')
  document.getElementById('deshabilitar-mv')?.classList.toggle('hide')
}

DisableMisionVision(){
  document.getElementById('mision-txt')?.setAttribute('disabled', 'disabled')
  document.getElementById('vision-txt')?.setAttribute('disabled', 'disabled')

  document.getElementById('habilitar-mv')?.classList.toggle('hide')
  document.getElementById('deshabilitar-mv')?.classList.toggle('hide')
}

EnableHistoria(){
  document.getElementById('iframe-value')?.removeAttribute('disabled')
  document.getElementById('textareaValidate')?.removeAttribute('disabled')

  document.getElementById('habilitar-hs')?.classList.toggle('hide')
  document.getElementById('deshabilitar-hs')?.classList.toggle('hide')
}

DisableHistoria(){
  document.getElementById('iframe-value')?.setAttribute('disabled', 'disabled')
  document.getElementById('textareaValidate')?.setAttribute('disabled', 'disabled')

  document.getElementById('habilitar-hs')?.classList.toggle('hide')
  document.getElementById('deshabilitar-hs')?.classList.toggle('hide')
}









// SISTEMA DE HABILITAR Y DESHABILITAR TEXTAREA DE VALORES
EnableValores() {
  const valores = document.getElementsByClassName('valores-txt')
for(let e = 0; e < valores.length; e++){
  valores[e].removeAttribute('disabled')
}

  document.getElementById('vhabilitar')?.classList.toggle('hide')
  document.getElementById('vdeshabilitar')?.classList.toggle('hide')
}

DisableValores(){
  const valores = document.getElementsByClassName('valores-txt')
for(let e = 0; e < valores.length; e++){
  valores[e].setAttribute('disabled', 'disabled')
}

  document.getElementById('vhabilitar')?.classList.toggle('hide')
  document.getElementById('vdeshabilitar')?.classList.toggle('hide')
}


async buscarporID(id:any){
  const respuestaID = await this.lineaService.obtenerLineaxID(id)
  this.dataLieneaxId = respuestaID.lineaFiend
  console.log(this.dataLieneaxId)
}

async editarTime(){
  let id =  this.dataLieneaxId._id
 const guardarRes = await this.lineaService.editarLineaforID(id,this.formularioEditHistoria.value)
 this.obtenerHistoria()
 this.Modal()

}

async editarHistoriaA(){
  let id =  this.dataLieneaxId._id
 const guardarRes = await this.lineaService.editarLineaforID(id,this.formularioEditlineaTiempo.value)
 this.obtenerLinea()
 this.Modal()
}




ModalTimeLine() {document.getElementById('modal-time-line')?.classList.toggle('modal') }



 async onSubmit(){}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// async editarHistoria(){

//     let enlaceValidate: any = (document.getElementById('iframe-value') as HTMLInputElement | any)?.value

//     let textareagtp: HTMLTextAreaElement | any = document.getElementById('textareaValidate')
//     let valorTextarea: any = textareagtp?.value


// if(enlaceValidate !== null && enlaceValidate !== undefined && enlaceValidate !== ''){ enlaceValidate }else{ enlaceValidate="" }
// if(valorTextarea !== null && valorTextarea !== undefined && valorTextarea !== ''){ valorTextarea }else{ valorTextarea="" }
// if(enlaceValidate == "" || valorTextarea == ""){
//   this.MessageSuccess('Los campos requeridos no pueden estar vacíos',2)
// }else{

//   const innerMessage = document.getElementsByClassName('innermsg')[2]
//   if (innerMessage) { innerMessage.innerHTML = "¿Desea guardar los cambios?"

//   document.getElementsByClassName('container-alert')[2]?.classList.add('show')
//   document.getElementsByClassName('message')[2]?.classList.add('show')
//   document.getElementsByClassName('cont-btns-alert')[2]?.classList.add('show')

//     document.getElementsByClassName('cancel')[2]?.addEventListener('click', function(){
//     document.getElementsByClassName('container-alert')[2]?.classList.remove('show')
//     document.getElementsByClassName('message')[2]?.classList.remove('show')
//     document.getElementsByClassName('cont-btns-alert')[2]?.classList.remove('show')
//   },false)
//   document.getElementsByClassName('confirm')[2]?.addEventListener('click', function(){
//     setTimeout(function() { document.getElementsByClassName('container-alert')[2]?.classList.remove('show')
//   },300) },false)

  //   let id:any = this._idhistoria
  // const respuestaAgregar = await this.historiaService.editarHistoria(this.formulario.value,id)
  // this.obtenerHistoria()
  // this.MessageSuccess('¡Datos guardados exitosamente!',2)
// }
// }
// }



ModalAddTimeLine() { document.getElementById('modal-time-line-add')?.classList.toggle('modal') }

  async agregarEventoLineaTiempo(){
    this.obtenerLinea()
    console.log(this.formularioAgregarLineaTiempo.value.image)

  }

  async obtnerNoticias (){
    const respuestasobtnerNoticas = await this.noticiasService.obtenerNoticas()
    this.dataLineaRespuesta = respuestasobtnerNoticas.noticas
    console.log(respuestasobtnerNoticas)
  }

  async obtnerHistorias (){
    let respuestasobtnerHistoria = await this.historiaService.obtenerHistoria()
    this.dataLineaRespuesta = respuestasobtnerHistoria.historia
  }

  ModalEditNotice() { document.getElementById('modal-edit-notice')?.classList.toggle('show') }
  NewModalNotice() { document.getElementById('modal-new-notice')?.classList.toggle('show') }



  async obtnerValores(){
    const respuesta = await this.ValoresService.obtenerValores()
    this.dataValores = respuesta.valores[0]
    this.Integridadmodel = this.dataValores.Innovacion
    this.PasionModel = this.dataValores.Pasion
    this.InnovacionModel = this.dataValores.Integridad
    this.OrientacionModel = this.dataValores.Orientacion
    console.log(this.dataValores)


    document.getElementById('txt-integridad')?.setAttribute('disabled', 'true')
    document.getElementById('txt-pasion')?.setAttribute('disabled', 'true')
    document.getElementById('txt-innovacion')?.setAttribute('disabled', 'true')
    document.getElementById('txt-orientacion')?.setAttribute('disabled', 'true')


    // this.MessageAlert("¡Bienvenido al Administrador de Procasa!",1,2000)
  }

  async editarValores(){
   let id =  this.dataValores._id
   const respuestaEdit = await this.ValoresService.editarValores(id,this.formularioValores.value)
   console.log(respuestaEdit)
  }



  async obtenerxidNoticias(id:any){
    const respuestaObtnerid = await this.noticiasService.obtenerxID(id)
    this.dataNoticiasxID = respuestaObtnerid.noticia
    console.log(this.dataNoticiasxID)
    this.tituloNoticia = this.dataNoticiasxID.title
    this.descripcionNoticia = this.dataNoticiasxID.descripcion
}


async eliminarLineaTiempo(id:any){

    const innerMessage = document.getElementsByClassName('innermsg')[3]
    if (innerMessage) { innerMessage.innerHTML = "¿Desea eliminar el evento seleccionado?"

    document.getElementsByClassName('container-alert')[3]?.classList.add('show')
    document.getElementsByClassName('message')[3]?.classList.add('show')
    document.getElementsByClassName('cont-btns-alert')[3]?.classList.add('show')

    document.getElementsByClassName('cancel')[3]?.addEventListener('click', function(){
      document.getElementsByClassName('container-alert')[3]?.classList.remove('show')
      document.getElementsByClassName('message')[3]?.classList.remove('show')
      document.getElementsByClassName('cont-btns-alert')[3]?.classList.remove('show')
    },false)

    document.getElementsByClassName('confirm')[3]?.addEventListener('click', async () => {
      const respuestaDelete = await this.lineaService.eliminarLineaTIempo(id)
      this.obtenerLinea()
      document.getElementsByClassName('cont-btns-alert')[3]?.classList.remove('show'); this.MessageSuccess('Evento eliminado',3) }, false) }


}

async eliminarNoticia(id){
  const respuestaDelete = await this.noticiasService.EliminarNoticia(id)
  console.log(respuestaDelete)
  this.obtnerNoticias()
}

  async editarNoticiasxid(){
    let id = this.dataNoticiasxID._id
    const respuestaeditNoticias = await this.noticiasService.editarnoticas(id,this.formularioEditarNoticias.value)
    console.log(respuestaeditNoticias)
    this.obtnerNoticias()
    this.ModalEditNotice()
   }

   async crearNoticia(){
    const respuestaCrearNoticia = await this.noticiasService.crearNoticia(this.formularioAgregarNoticias.value)
    console.log(respuestaCrearNoticia)
    this.obtnerNoticias()
    this.NewModalNotice()
   }



  onPhotoSelected(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      if (event.target.files && event.target.files[0]) {
        this.file = event.target.files[0];

        // image preview
        const reader = new FileReader();

        reader.onload = (e) => {
          // Cambia la asignación solo si reader.result no es null
          if (reader.result !== null) {
            this.photoSelected = reader.result as string | ArrayBuffer;
          }
        };

        reader.readAsDataURL(this.file);
      }
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



  getFileNoticia($event: any): void {
    const [ file ] = $event.target.files;
    this.fileTmpNoticia = {
      fileRaw:file,
      fileName:file.name
    }
  }

  sendFileNoticia():void{

    const body = new FormData()
    if(this.fileTmpNoticia){
      body.append('imgPhat', this.fileTmpNoticia.fileRaw, this.fileTmpNoticia.fileName)
      body.append('titulo', this.formularioAgregarNoticias.value.titulo)
      body.append('descripcion',this.formularioAgregarNoticias.value.descripcion)
    }else{
      body.append('titulo', this.formularioAgregarNoticias.value.titulo)
      body.append('descripcion',this.formularioAgregarNoticias.value.descripcion)
    }

    this.noticiasService.sendPost(body)
    .subscribe(res => {console.log(res) ,this.obtnerNoticias(),this.fileTmpNoticia = null})
  }
  getFilePortada($event: any): void {
    //TODO esto captura el archivo!
    const [ file ] = $event.target.files;
    this.imgPathPrincipal = {
      fileRaw:file,
      fileName:file.name
    }
  }

  sendFilePortada():void{
    const body = new FormData()
    if(this.imgPathPrincipal){
      body.append('imgPathPrincipal', this.imgPathPrincipal.fileRaw, this.imgPathPrincipal.fileName);
      this.historiaService.sendPost(body,this._idhistoria)
      .subscribe(res =>{ this.MessageSuccess('¡Guardado exitosamente!',1)
      document.getElementById('container-alert-a')?.classList.remove('show')
        console.log(res), this.obtenerHistoria() })
    }else{
      console.log('error porfavor selecione una imagen')
    }
  }


  getFileUpdateTiempo($event: any): void {
    //TODO esto captura el archivo!
    const [ file ] = $event.target.files;
    this.fileUpdateLineaTiempo = {
      fileRaw:file,
      fileName:file.name
    }
  }

  sendFileUpdateTiempo():void{

    let id = this.dataLieneaxId._id
    const body = new FormData()
    if(this.fileUpdateLineaTiempo){
      body.append('ImgPathLineaTiempo', this.fileUpdateLineaTiempo.fileRaw, this.fileUpdateLineaTiempo.fileName)
      body.append('titleLineaTiempo', this.formularioEditlineaTiempo.value.titleLineaTiempo)
      body.append('descriptionLineaTiempo',this.formularioEditlineaTiempo.value.descriptionLineaTiempo)

    }else{
      body.append('titleLineaTiempo', this.formularioEditlineaTiempo.value.titleLineaTiempo)
      body.append('descriptionLineaTiempo',this.formularioEditlineaTiempo.value.descriptionLineaTiempo)
    }
    this.lineaService.sendEdit(body,id)
    .subscribe(res =>{console.log(res), this.obtenerLinea(),this.fileUpdateLineaTiempo = null})
  }

  getFileUpdateNoticia($event: any): void {
    //TODO esto captura el archivo!
    const [ file ] = $event.target.files;
    this.fileUpdateNoticia = {
      fileRaw:file,
      fileName:file.name
    }
  }


  sendFileUpdateNoticia():void{

    let id = this.dataNoticiasxID._id
    const body = new FormData();

    if(this.fileUpdateNoticia){
      body.append('imgPhat', this.fileUpdateNoticia.fileRaw, this.fileUpdateNoticia.fileName);
      body.append('title', this.formularioEditarNoticias.value.title)
      body.append('descripcion',this.formularioEditarNoticias.value.descripcion)
      console.log('con imagen')
    }else{
      console.log('sin imagen')
      body.append('imgPhat', this.dataNoticiasxID.imgPhat)
      body.append('title', this.formularioEditarNoticias.value.title)
      body.append('descripcion',this.formularioEditarNoticias.value.descripcion)

    }

    this.noticiasService.sendEdit(body,id)
    .subscribe(res =>{console.log(res), this.obtnerNoticias(),this.fileUpdateNoticia = null})
  }


ShowMore(){
  console.log("-- MOSTRAR MÁS --")
}



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
    },2000)
  }
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
preSaveBackground(event: Event): void  {
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
        this.anchoimg = imagen.width, this.altoimg = imagen.height


        document.getElementsByClassName('danger-red')[0]?.classList.remove('limit')
        document.getElementsByClassName('danger-red')[1]?.classList.remove('limit')
        document.getElementsByClassName('danger-red')[2]?.classList.remove('limit')

        if(this.anchoimg > 2000){  document.getElementsByClassName('danger-red')[0].classList.add('limit') }
        if(this.altoimg > 1500){ document.getElementsByClassName('danger-red')[1].classList.add('limit') }
        if((size/1024) > 2048 ){  document.getElementsByClassName('danger-red')[2].classList.add('limit') }

        document.getElementById('innersize-bg')!.innerHTML = sizemedida
        document.getElementById('innerwidth-bg')!.innerHTML = this.anchoimg + " px"
        document.getElementById('innerheight-bg')!.innerHTML = this.altoimg + " px"
        document.getElementById('file-bg')?.setAttribute('data-content', fileName)
        document.getElementById('pre-bg')?.removeAttribute('src')
        document.getElementById('preview-bg')?.removeAttribute('src')
        document.getElementById('preview-bg')?.setAttribute('src', img.src)
        document.getElementById('pre-bg')?.setAttribute('src', img.src)
        document.getElementById('endpreview-bg')?.setAttribute('src', img.src)
      }
    }
    lector.readAsDataURL(archivo)
  }

  document.getElementById('btn-save-bg')?.addEventListener('click', () => {

    if(archivo!==null || archivo!==undefined){

  const innerMessage = document.getElementsByClassName('innermsg')[0]
  if (innerMessage) { innerMessage.innerHTML = "¿Desea guardar los cambios?"


  document.getElementsByClassName('container-alert')[0]?.classList.add('show')
  document.getElementsByClassName('message')[0]?.classList.add('show')
  document.getElementsByClassName('cont-btns-alert')[0]?.classList.add('show')

  document.getElementsByClassName('cancel')[0]?.addEventListener('click', function(){
    document.getElementsByClassName('container-alert')[0]?.classList.remove('show')
    document.getElementsByClassName('message')[0]?.classList.remove('show')
    document.getElementsByClassName('cont-btns-alert')[0]?.classList.remove('show')
  },false)
  document.getElementsByClassName('confirm')[0]?.addEventListener('click', function(){ setTimeout(function() { document.getElementsByClassName('container-alert')[0]?.classList.remove('show') },300) },false)
  }
}
}, false)
}


sendFileBackground():void{
  const body = new FormData()
  if(this.fileBackgrud){
    body.append('imgPathFondo', this.fileBackgrud.fileRaw, this.fileBackgrud.fileName);
    this.historiaService.sendback(body,this._idhistoria)
    .subscribe(res =>{ this.MessageSuccess('¡Guardado exitosamente!',0)
    document.getElementById('container-alert-a')?.classList.remove('show')
      console.log(res), this.obtenerHistoria() })
  }else{
    console.log('error porfavor selecione una imagen')
  }
}


getFileBack($event: any): void {
  //TODO esto captura el archivo!
  const [ file ] = $event.target.files;
  this.fileBackgrud = {
    fileRaw:file,
    fileName:file.name
  }
}




testEmptyBackground(){
  let prefile: any | null = (document.getElementById('file-bg') as HTMLInputElement).value
  if(prefile==null || prefile==undefined || prefile==""){ this.MessageSuccess("No hay archivo seleccionado", 0) }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////77777
  preSavePortada(event: Event): void  {

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
        this.anchoimg = imagen.width, this.altoimg = imagen.height


        document.getElementsByClassName('danger-red')[3]?.classList.remove('limit')
        document.getElementsByClassName('danger-red')[4]?.classList.remove('limit')
        document.getElementsByClassName('danger-red')[5]?.classList.remove('limit')

        if(this.anchoimg > 2000){  document.getElementsByClassName('danger-red')[3].classList.add('limit') }
        if(this.altoimg > 1500){ document.getElementsByClassName('danger-red')[4].classList.add('limit') }
        if((size/1024) > 2048 ){  document.getElementsByClassName('danger-red')[5].classList.add('limit') }

        document.getElementById('innersize')!.innerHTML = sizemedida
        document.getElementById('innerwidth')!.innerHTML = this.anchoimg + " px"
        document.getElementById('innerheight')!.innerHTML = this.altoimg + " px"
        document.getElementById('file-portada')?.setAttribute('data-content', fileName)
        document.getElementById('preview-portada')?.removeAttribute('src')
        document.getElementById('pre-portada')?.removeAttribute('src')
        document.getElementById('preview-portada')?.setAttribute('src', img.src)
        document.getElementById('pre-portada')?.setAttribute('src', img.src)
        document.getElementById('endpreview-portada')?.setAttribute('src', img.src)
      }
    }
    lector.readAsDataURL(archivo)
  }

  document.getElementById('btn-save-portada')?.addEventListener('click', () => {

    if(archivo!==null || archivo!==undefined){

  const innerMessage = document.getElementsByClassName('innermsg')[1]
  if (innerMessage) { innerMessage.innerHTML = "¿Desea guardar los cambios?"


  document.getElementsByClassName('container-alert')[1]?.classList.add('show')
  document.getElementsByClassName('message')[1]?.classList.add('show')
  document.getElementsByClassName('cont-btns-alert')[1]?.classList.add('show')

  document.getElementsByClassName('cancel')[1]?.addEventListener('click', function(){
    document.getElementsByClassName('container-alert')[1]?.classList.remove('show')
    document.getElementsByClassName('message')[1]?.classList.remove('show')
    document.getElementsByClassName('cont-btns-alert')[1]?.classList.remove('show')
  },false)
  document.getElementsByClassName('confirm')[1]?.addEventListener('click', function(){
    setTimeout(function() {
    document.getElementsByClassName('container-alert')[1]?.classList.remove('show')
  },300) },false)
  }
}
}, false)
}

testEmptyPortada(){
   let prefile: any | null = (document.getElementById('file-portada') as HTMLInputElement).value
   if(prefile==null || prefile==undefined || prefile==""){ this.MessageSuccess("No hay archivo seleccionado", 1) }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
preSaveMisionVision() {
  const misionTextArea: HTMLTextAreaElement | any = document.getElementById('mision-txt')
  const visionTextArea: HTMLTextAreaElement | any = document.getElementById('vision-txt')

  let mision: string = ''
  let vision: string = ''

  if (misionTextArea instanceof HTMLTextAreaElement) { mision = misionTextArea.value }
  if (visionTextArea instanceof HTMLTextAreaElement) { vision = visionTextArea.value }

  if(mision!=="" && vision!==""){


  const innerMessage = document.getElementsByClassName('innermsg')[4]
  if (innerMessage) { innerMessage.innerHTML = "¿Desea guardar los cambios?"


  document.getElementsByClassName('container-alert')[4]?.classList.add('show')
  document.getElementsByClassName('message')[4]?.classList.add('show')
  document.getElementsByClassName('cont-btns-alert')[4]?.classList.add('show')

  document.getElementsByClassName('cancel')[4]?.addEventListener('click', function(){
    document.getElementsByClassName('container-alert')[4]?.classList.remove('show')
    document.getElementsByClassName('message')[4]?.classList.remove('show')
    document.getElementsByClassName('cont-btns-alert')[4]?.classList.remove('show')
  },false)
  document.getElementsByClassName('confirm')[4]?.addEventListener('click', function(){
    setTimeout(function() {
      document.getElementsByClassName('container-alert')[4]?.classList.remove('show')
    },300) },false)
  }
  }else if((mision=="" && vision=="") || (mision=="" || vision=="")) { this.MessageSuccess("Los campos requeridos no pueden estar vacíos",4) }
}

onClick() {
  this.guardarMision()
  setTimeout(() => { this.containerAlertElement.nativeElement.classList.remove('show') }, 300) }

async guardarMision() {
  let id = this.dataMisionÑ._id
  const respuestaEdit = await this.misionService.editarMisionValor(id, this.formularioMisionValor.value)
}





//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////77
preSaveValores() {
  const integridadTextArea: HTMLTextAreaElement | any = document.getElementById('txt-integridad')
  const pasionTextArea: HTMLTextAreaElement | any = document.getElementById('txt-pasion')
  const innovacionTextArea: HTMLTextAreaElement | any = document.getElementById('txt-innovacion')
  const orientacionTextArea: HTMLTextAreaElement | any = document.getElementById('txt-orientacion')

  let integridad: string = ''
  let pasion: string = ''
  let innovacion: string = ''
  let orientacion: string = ''

  if (integridadTextArea instanceof HTMLTextAreaElement) { integridad = integridadTextArea.value }
  if (pasionTextArea instanceof HTMLTextAreaElement) { pasion = pasionTextArea.value }
  if (innovacionTextArea instanceof HTMLTextAreaElement) { innovacion = innovacionTextArea.value }
  if (orientacionTextArea instanceof HTMLTextAreaElement) { orientacion = orientacionTextArea.value }

  if(integridad!=="" && pasion!=="" && innovacion!=="" && orientacion!==""){
  const innerMessage = document.getElementsByClassName('innermsg')[4]
  if (innerMessage) { innerMessage.innerHTML = "¿Desea guardar los cambios?"


  document.getElementsByClassName('container-alert')[4]?.classList.add('show')
  document.getElementsByClassName('message')[4]?.classList.add('show')
  document.getElementsByClassName('cont-btns-alert')[4]?.classList.add('show')

  document.getElementsByClassName('cancel')[4]?.addEventListener('click', function(){
    document.getElementsByClassName('container-alert')[4]?.classList.remove('show')
    document.getElementsByClassName('message')[4]?.classList.remove('show')
    document.getElementsByClassName('cont-btns-alert')[4]?.classList.remove('show')
  },false)
  document.getElementsByClassName('confirm')[4]?.addEventListener('click', function(){
    setTimeout(function() {
      document.getElementsByClassName('container-alert')[4]?.classList.remove('show')
    },300) },false)
  }
  }else{ this.MessageSuccess("Los campos requeridos no pueden estar vacíos",4) }
}

onClickValores() {
  this.guardarValores()
  setTimeout(() => { this.containerAlertElementVal.nativeElement.classList.remove('show') }, 300) }

async guardarValores() {
  let id = this.dataValores._id
  const respuestaEdit = await this.ValoresService.editarValores(id, this.formularioValores.value)
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////77
preSaveHistoria() {

  let enlace: any = (document.getElementById('iframe-value') as HTMLInputElement | any)?.value
  const preEnlace: HTMLInputElement | null = document.getElementById('iframe-value') as HTMLInputElement
  const descTextArea: HTMLTextAreaElement | any = document.getElementById('textareaValidate')
  let desc: string = ''

  if (preEnlace instanceof HTMLTextAreaElement) { enlace = preEnlace.value }
  if (descTextArea instanceof HTMLTextAreaElement) { desc = descTextArea.value }

  if(enlace!=="" && desc!==""){
  const innerMessage = document.getElementsByClassName('innermsg')[2]
  if (innerMessage) { innerMessage.innerHTML = "¿Desea guardar los cambios?"

  document.getElementsByClassName('container-alert')[2]?.classList.add('show')
  document.getElementsByClassName('message')[2]?.classList.add('show')
  document.getElementsByClassName('cont-btns-alert')[2]?.classList.add('show')

  document.getElementsByClassName('cancel')[2]?.addEventListener('click', function(){
    document.getElementsByClassName('container-alert')[2]?.classList.remove('show')
    document.getElementsByClassName('message')[2]?.classList.remove('show')
    document.getElementsByClassName('cont-btns-alert')[2]?.classList.remove('show')
  },false)
  document.getElementsByClassName('confirm')[2]?.addEventListener('click', function(){
    setTimeout(function() {
      document.getElementsByClassName('container-alert')[2]?.classList.remove('show')
    },300) },false)
  }
  }else{ this.MessageSuccess("Los campos requeridos no pueden estar vacíos",2) }
}

onClickHistoria() {
  this.guardarHistoria()
  setTimeout(() => { this.containerAlertElementHis.nativeElement.classList.remove('show') }, 300) }

async guardarHistoria() {

  const respuestaEdit = await this.historiaService.editarHistoria( this.formularioEditHistoria.value,this._idhistoria)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

preSaveTimeLine(event: Event): void  {

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
        this.anchoimg = imagen.width, this.altoimg = imagen.height

const saveButtonTL = document.getElementById('save-new-tili')
if (saveButtonTL) {
  saveButtonTL.addEventListener('click', () => {

    this.saveNewTimeLine()

}, false) }

        // document.getElementsByClassName('danger-red')[3]?.classList.remove('limit')
        // document.getElementsByClassName('danger-red')[4]?.classList.remove('limit')
        // document.getElementsByClassName('danger-red')[5]?.classList.remove('limit')

        // if(this.anchoimg > 2000){  document.getElementsByClassName('danger-red')[3].classList.add('limit') }
        // if(this.altoimg > 1500){ document.getElementsByClassName('danger-red')[4].classList.add('limit') }
        // if((size/1024) > 2048 ){  document.getElementsByClassName('danger-red')[5].classList.add('limit') }

        document.getElementsByClassName('innerdetails')[2]!.innerHTML = sizemedida
        document.getElementsByClassName('innerdetails')[0]!.innerHTML = this.anchoimg + " px"
        document.getElementsByClassName('innerdetails')[1]!.innerHTML = this.altoimg + " px"
        document.getElementById('new-file-input')?.setAttribute('data-content', fileName)
        // document.getElementById('pre-portada')?.removeAttribute('src')
        document.getElementById('img-pre-tl')?.setAttribute('src', img.src)
        // document.getElementById('pre-portada')?.setAttribute('src', img.src)
      }
    }
    lector.readAsDataURL(archivo)
  }
}

//#################################################################################################################################
saveNewTimeLine() {

  const fileInput: HTMLInputElement | null = document.getElementById('new-file-input') as HTMLInputElement | null

  const tituloInput: HTMLInputElement | null = document.getElementById('new-titulo-tl') as HTMLInputElement | null
  const descripcionInput: HTMLInputElement | null = document.getElementById('new-desc-tl') as HTMLInputElement | null

  let file: string = 'empty.jpg'
  let titulo: string = ''
  let descripcion: string = ''

  if (fileInput instanceof HTMLInputElement) { file = fileInput.value }
  if (tituloInput instanceof HTMLInputElement) { titulo = tituloInput.value }
  if (descripcionInput instanceof HTMLInputElement) { descripcion = descripcionInput.value }

  if(file!=="" && titulo!=="" && descripcion!==""){
  const innerMessage = document.getElementsByClassName('innermsg')[6]
  if (innerMessage) { innerMessage.innerHTML = "¿Desea guardar los cambios?"

  document.getElementsByClassName('container-alert')[6]?.classList.add('show')
  document.getElementsByClassName('message')[6]?.classList.add('show')
  document.getElementsByClassName('cont-btns-alert')[6]?.classList.add('show')

    document.getElementsByClassName('cancel')[6]?.addEventListener('click', function(){
    document.getElementsByClassName('container-alert')[6]?.classList.remove('show')
    document.getElementsByClassName('message')[6]?.classList.remove('show')
    document.getElementsByClassName('cont-btns-alert')[6]?.classList.remove('show')
  },false)
  document.getElementsByClassName('confirm')[6]?.addEventListener('click', function(){
    setTimeout(function() {
      document.getElementsByClassName('container-alert')[6]?.classList.remove('show')
    },300) },false)
  }
  }else{ this.MessageSuccess("Los campos requeridos no pueden estar vacíos",6) }
}

onClickNewTimeLine() {
  this.sendFile()
  setTimeout(() => { this.containerAlertElementTL.nativeElement.classList.remove('show') }, 300) }

  sendFile():void{

    const body = new FormData()

    if(this.fileTmp){
      body.append('ImgPathLineaTiempo', this.fileTmp.fileRaw, this.fileTmp.fileName);
      body.append('titleLineaTiempo', this.formularioAgregarLineaTiempo.value.titleLineaTiempo)
      body.append('descriptionLineaTiempo',this.formularioAgregarLineaTiempo.value.descriptionLineaTiempo)
    }else{
      body.append('titleLineaTiempo', this.formularioAgregarLineaTiempo.value.titleLineaTiempo)
      body.append('descriptionLineaTiempo',this.formularioAgregarLineaTiempo.value.descriptionLineaTiempo)
    }
    this.lineaService.sendPost(body)
    .subscribe(res =>{console.log(res), this.obtenerLinea(),this.fileTmp = null})
    this.MessageSuccess('Datos guardados exitosamente',6)
  }



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EDITAR LINEA DE TIEMPO
// N O    S I R V E **************************************************************************************************************
// *******************************************************************************************************************************

//   saveNewTimeLineEdited() {

//     const fileInput: HTMLInputElement | null = document.getElementById('new-file-input') as HTMLInputElement | null

//     const tituloInput: HTMLInputElement | null = document.getElementById('new-titulo-tl') as HTMLInputElement | null
//     const descripcionInput: HTMLInputElement | null = document.getElementById('new-desc-tl') as HTMLInputElement | null

//     let file: string = ''
//     let titulo: string = ''
//     let descripcion: string = ''

//     if (fileInput instanceof HTMLInputElement) { file = fileInput.value }
//     if (tituloInput instanceof HTMLInputElement) { titulo = tituloInput.value }
//     if (descripcionInput instanceof HTMLInputElement) { descripcion = descripcionInput.value }

//     if(file!=="" && titulo!=="" && descripcion!==""){
//     const innerMessage = document.getElementsByClassName('innermsg')[6]
//     if (innerMessage) { innerMessage.innerHTML = "¿Desea guardar los cambios?"

//     document.getElementsByClassName('container-alert')[6]?.classList.add('show')
//     document.getElementsByClassName('message')[6]?.classList.add('show')
//     document.getElementsByClassName('cont-btns-alert')[6]?.classList.add('show')

//       document.getElementsByClassName('cancel')[6]?.addEventListener('click', function(){
//       document.getElementsByClassName('container-alert')[6]?.classList.remove('show')
//       document.getElementsByClassName('message')[6]?.classList.remove('show')
//       document.getElementsByClassName('cont-btns-alert')[6]?.classList.remove('show')
//     },false)
//     document.getElementsByClassName('confirm')[6]?.addEventListener('click', function(){
//       setTimeout(function() {
//         document.getElementsByClassName('container-alert')[6]?.classList.remove('show')
//       },300) },false)
//     }
//     }else{ this.MessageSuccess("Los campos requeridos no pueden estar vacíos",6) }
//   }

//   onClickNewTimeLineEdited() {
//     this.sendFile()
//     setTimeout(() => { this.containerAlertElementTL.nativeElement.classList.remove('show') }, 300) }

//     sendFileEdit():void{

//       const body = new FormData()

//       if(this.fileTmp){
//         body.append('ImgPathLineaTiempo', this.fileTmp.fileRaw, this.fileTmp.fileName);
//         body.append('titleLineaTiempo', this.formularioAgregarLineaTiempo.value.titleLineaTiempo)
//         body.append('descriptionLineaTiempo',this.formularioAgregarLineaTiempo.value.descriptionLineaTiempo)
//       }else{
//         body.append('titleLineaTiempo', this.formularioAgregarLineaTiempo.value.titleLineaTiempo)
//         body.append('descriptionLineaTiempo',this.formularioAgregarLineaTiempo.value.descriptionLineaTiempo)
//       }
//       this.lineaService.sendPost(body)
//       .subscribe(res =>{console.log(res), this.obtenerLinea(),this.fileTmp = null})
//       this.MessageSuccess('Datos guardados exitosamente',6)
//     }



async editarModal(id:any) {
  const respuestaid = await this.lineaService.obtenerLineaxID(id)
  this.dataLieneaxId = respuestaid.lineaFiend
  this.tituloModal = this.dataLieneaxId.titleLineaTiempo
  this.descripcionModal = this.dataLieneaxId.descriptionLineaTiempo
}
 Modal() { document.getElementById('modal-time-line')?.classList.toggle('modal') }




 // ***
saveEditedLineaTiempo() {

//   const fileInput: HTMLInputElement | null = document.getElementById('file-edit-lt') as HTMLInputElement | null
//   let file: any = ''
//   if (fileInput instanceof HTMLInputElement) {
//     file = fileInput.files?.[0]
// // ***
//     const tituloInput: HTMLInputElement | null = document.getElementById('new-titulo-tl') as HTMLInputElement | null
//     const descripcionInput: HTMLInputElement | null = document.getElementById('new-desc-tl') as HTMLInputElement | null

//     let titulo: string = ''
//     let descripcion: string = ''

//     if (tituloInput instanceof HTMLInputElement) { titulo = tituloInput.value }
//     if (descripcionInput instanceof HTMLInputElement) { descripcion = descripcionInput.value }



//     if(file!=="" && titulo!=="" && descripcion!==""){
//       const innerMessage = document.getElementsByClassName('innermsg')[7]
//       if (innerMessage) { innerMessage.innerHTML = "¿Desea guardar los cambios?"

//       document.getElementsByClassName('container-alert')[7]?.classList.add('show')
//       document.getElementsByClassName('message')[7]?.classList.add('show')
//       document.getElementsByClassName('cont-btns-alert')[7]?.classList.add('show')

//         document.getElementsByClassName('cancel')[7]?.addEventListener('click', function(){
//         document.getElementsByClassName('container-alert')[7]?.classList.remove('show')
//         document.getElementsByClassName('message')[7]?.classList.remove('show')
//         document.getElementsByClassName('cont-btns-alert')[7]?.classList.remove('show')
//       },false)
//       document.getElementsByClassName('confirm')[7]?.addEventListener('click', () => {
//         this.onClickEditedTimeLineEdited()
//         setTimeout(function() {
//           document.getElementsByClassName('container-alert')[7]?.classList.remove('show')
//         },300) },false)
//       }
//       }else{ this.MessageSuccess("Los campos requeridos no pueden estar vacíos",7) }
//   }
this.MessageSuccess("ERROR :(",7)
}

  onClickEditedTimeLineEdited() { this.sendFile(); setTimeout(() => { this.containerAlertElementTLEdited.nativeElement.classList.remove('show') }, 300) }






//#################################################################################################################################
saveNewNotice() {

  const fileInput: HTMLInputElement | null = document.getElementById('new-file-input') as HTMLInputElement | null

  const tituloInput: HTMLInputElement | null = document.getElementById('new-titulo-tl') as HTMLInputElement | null
  const descripcionInput: HTMLInputElement | null = document.getElementById('new-desc-tl') as HTMLInputElement | null

  let file: string = ''
  let titulo: string = ''
  let descripcion: string = ''

  if (fileInput instanceof HTMLInputElement) { file = fileInput.value }
  if (tituloInput instanceof HTMLInputElement) { titulo = tituloInput.value }
  if (descripcionInput instanceof HTMLInputElement) { descripcion = descripcionInput.value }

  if(file!=="" && titulo!=="" && descripcion!==""){
  const innerMessage = document.getElementsByClassName('innermsg')[6]
  if (innerMessage) { innerMessage.innerHTML = "¿Desea guardar los cambios?"

  document.getElementsByClassName('container-alert')[6]?.classList.add('show')
  document.getElementsByClassName('message')[6]?.classList.add('show')
  document.getElementsByClassName('cont-btns-alert')[6]?.classList.add('show')

    document.getElementsByClassName('cancel')[6]?.addEventListener('click', function(){
    document.getElementsByClassName('container-alert')[6]?.classList.remove('show')
    document.getElementsByClassName('message')[6]?.classList.remove('show')
    document.getElementsByClassName('cont-btns-alert')[6]?.classList.remove('show')
  },false)
  document.getElementsByClassName('confirm')[6]?.addEventListener('click', function(){
    setTimeout(function() {
      document.getElementsByClassName('container-alert')[6]?.classList.remove('show')
    },300) },false)
  }
  }else{ this.MessageSuccess("Los campos requeridos no pueden estar vacíos",6) }
}

onClickNewNotice() {
  this.sendFile()
  setTimeout(() => { this.containerAlertElementTL.nativeElement.classList.remove('show') }, 300) }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////777

saveNewNoticia(event: Event): void {
  // file-noticia, titulo-noticia, desc-noticia

//   let prefilenoticia: any = (document.getElementById('file-noticia') as HTMLInputElement | any)?.value
//   const pretitnoticia: HTMLInputElement | null = document.getElementById('titulo-noticia') as HTMLInputElement
//   const predescnoticia: HTMLTextAreaElement | any = document.getElementById('desc-noticia')
//   let filen:string = ''
//   let noticia:string = ''
//   let descno:string = ''

//   if (prefilenoticia instanceof HTMLTextAreaElement) { filen = filen.value }

//   if(enlace!=="" && desc!==""){
//   const innerMessage = document.getElementsByClassName('innermsg')[2]
//   if (innerMessage) { innerMessage.innerHTML = "¿Desea guardar los cambios?"

//   document.getElementsByClassName('container-alert')[2]?.classList.add('show')
//   document.getElementsByClassName('message')[2]?.classList.add('show')
//   document.getElementsByClassName('cont-btns-alert')[2]?.classList.add('show')

//   document.getElementsByClassName('cancel')[2]?.addEventListener('click', function(){
//     document.getElementsByClassName('container-alert')[2]?.classList.remove('show')
//     document.getElementsByClassName('message')[2]?.classList.remove('show')
//     document.getElementsByClassName('cont-btns-alert')[2]?.classList.remove('show')
//   },false)
//   document.getElementsByClassName('confirm')[2]?.addEventListener('click', function(){
//     setTimeout(function() {
//       document.getElementsByClassName('container-alert')[2]?.classList.remove('show')
//     },300) },false)
//   }
//   }else{ this.MessageSuccess("Los campos requeridos no pueden estar vacíos",2) }
// }

// onClickHistoria() {
//   this.guardarHistoria()
//   setTimeout(() => { this.containerAlertElementHis.nativeElement.classList.remove('show') }, 300) }

// async guardarHistoria() {

//   const respuestaEdit = await this.historiaService.editarHistoria( this.formularioEditHistoria.value,this._idhistoria)
}


























}
