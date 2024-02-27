import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { HistoriaService } from '../../services/historia.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LineaTiempoService } from '../../services/linea-tiempo.service';
import { MisionService } from '../../services/mision.service';
import { NoticasService } from '../../services/noticas.service';
import { ValoresService } from '../../services/valores.service';
import { AfterViewInit } from '@angular/core';

interface HtmlInputEvent extends Event { target: HTMLInputElement }

@Component({
  selector: 'app-adminprincipal',
  templateUrl: './adminprincipal.component.html',
  styleUrl: './adminprincipal.component.css'
})

export class AdminprincipalComponent implements OnInit, AfterViewInit {

  statusBackground
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
  formularioEditarFondoColor: FormGroup
  colorBg:any
  containerAlert: HTMLElement | any
  imgPrincipal: any
  imgfondo:any
  fileBg

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
@ViewChild('containerAlertNewNoticia') containerAlertNewNoticia!: ElementRef
@ViewChild('confirmNewNoticia') confirmNewNoticia!: ElementRef
@ViewChild('containeralertUpdateNotice') containeralertUpdateNotice!: ElementRef
@ViewChild('confirmUpdateNotice') confirmUpdateNotice!: ElementRef

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
fechaModal
mostrarPorModal

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
      DescripcionHistoria: new FormControl((''),[Validators.required]),
      EncalceVideo: new FormControl((''),[Validators.required])
    })

    this.formularioEditlineaTiempo = new FormGroup({
      titleLineaTiempo: new FormControl((''),[Validators.required]),
      descriptionLineaTiempo: new FormControl(),
      mostrarPor: new FormControl((''),[Validators.required]),
      fecha: new FormControl((''),[Validators.required]),
    })
    this.formularioEditHistoria = new FormGroup({
      EncalceVideo: new FormControl((''),[Validators.required]),
      DescripcionHistoria: new FormControl((''),[Validators.required])
    })
    this.formularioMisionValor = new FormGroup({
      textMision: new FormControl((''),[Validators.required]),
      textVIsion: new FormControl((''),[Validators.required])
    })
   this.formularioAgregarLineaTiempo = new FormGroup({
    titleLineaTiempo: new FormControl((''),[Validators.required]),
    descriptionLineaTiempo: new FormControl((''),[Validators.required]),
    fecha: new FormControl((''),[Validators.required]),
    image: new FormControl((''),[Validators.required]),
    mostrarPor: new FormControl((''),[Validators.required]),
    })
    this.formularioValores = new FormGroup({
      Integridad: new FormControl((''),[Validators.required]),
      Pasion: new FormControl((''),[Validators.required]),
      Innovacion: new FormControl((''),[Validators.required]),
      Orientacion: new FormControl((''),[Validators.required]),

      })
    this.formularioEditarNoticias = new FormGroup({
        title: new FormControl((''),[Validators.required]) ,
        imgPhat: new FormControl((''),[Validators.required]),
        descripcion: new FormControl((''),[Validators.required]),
        })
    this.formularioAgregarNoticias= new FormGroup({
     title: new FormControl((''),[Validators.required]),
     imgPhat: new FormControl((''),[Validators.required]),
     descripcion: new FormControl((''),[Validators.required]),
     tipo: new FormControl((''),[Validators.required]),
     })
this.formularioEditarFondoColor = new FormGroup({
  colorFondo: new FormControl((''),[Validators.required]),
})



  }
  ngAfterViewInit(): void {
    this.confirmElement.nativeElement.addEventListener('click', this.onClick.bind(this))
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
toScrollAdmin(elem:number){ document.getElementsByClassName("scroll-cont")[elem]?.scrollIntoView({behavior: "smooth"}) }
toScrollTop(){ document.getElementById("space-esp")?.scrollIntoView({behavior: "smooth"}) }

// AL INICIAR
  async ngOnInit()  {



    this.containerAlert = document.getElementById('background-alert')
    this.fileBg = document.querySelector('#file-bg')

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


//Todos los metodos de mision 

async obtenerMision(){
  const respuesta = await this.misionService.obtenerMsion()
  this.dataMisionÑ = respuesta.Mision[0]
  this.mision = this.dataMisionÑ.textMision
  this.vision = this.dataMisionÑ.textVIsion

  document.getElementById('mision-txt')?.setAttribute('disabled', 'true')
  document.getElementById('vision-txt')?.setAttribute('disabled', 'true')
}

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





preSaveMisionVision() {
  const misionTextArea: HTMLTextAreaElement | any = document.getElementById('mision-txt')
  const visionTextArea: HTMLTextAreaElement | any = document.getElementById('vision-txt')

  let mision: string = ''
  let vision: string = ''

  if (misionTextArea instanceof HTMLTextAreaElement) { mision = misionTextArea.value }
  if (visionTextArea instanceof HTMLTextAreaElement) { vision = visionTextArea.value }

  if(mision!=="" && vision!==""){
    
    this.AlertOption("¿Desea guardar loa cambios de Misión y Visión?")
    const parent: HTMLElement | any = this.containerAlert
    const btn: HTMLElement | any = parent?.childNodes[0]?.childNodes[0]?.childNodes[1]?.childNodes[0]
  
    if (btn) {
      btn.onclick = () => {
        this.guardarMision()
    }
    }
    
  }else if((mision=="" && vision=="") || mision=="" || vision=="") {
    this.AlertMessage("Todos los campos son requeridos", 1500)
  }
}

async guardarMision() {
  try {
    let id = this.dataMisionÑ._id
    const respuestaEdit = await this.misionService.editarMisionValor(id, this.formularioMisionValor.value)
    console.log(respuestaEdit)
  this.AlertMessage("¡Datos actualizados!", 1500)
  } catch (error) {
      this.AlertMessage("Error :(", 1500)
    }

}



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
    this.AlertOption("¿Desea guardar los nuevos Valores?")
  const parent: HTMLElement | any = this.containerAlert
  const btn: HTMLElement | any = parent?.childNodes[0]?.childNodes[0]?.childNodes[1]?.childNodes[0]

  if (btn) { btn.onclick = () => { this.guardarValores() }}
  
  }else{ this.AlertMessage("Todos los campos son requeridos", 1500) }
}

async guardarValores() {
  try {
    let id = this.dataValores._id
    const respuestaEdit = await this.ValoresService.editarValores(id, this.formularioValores.value)
    this.AlertMessage("¡Datos actualizados!", 1500)
  } catch (error) {
    this.AlertMessage("Error :(", 1500)
  }
}


//TODOS LOS METODOS DE HISTORIA


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
async editarHistoriaA(){
  let id =  this.dataLieneaxId._id
 const guardarRes = await this.lineaService.editarLineaforID(id,this.formularioEditlineaTiempo.value)
 this.obtenerLinea()
 this.Modal()
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


preSaveHistoria() {

  let enlace: any = (document.getElementById('iframe-value') as HTMLInputElement | any)?.value
  const preEnlace: HTMLInputElement | null = document.getElementById('iframe-value') as HTMLInputElement
  const descTextArea: HTMLTextAreaElement | any = document.getElementById('textareaValidate')
  let desc: string = ''

  if (preEnlace instanceof HTMLTextAreaElement) { enlace = preEnlace.value }
  if (descTextArea instanceof HTMLTextAreaElement) { desc = descTextArea.value }

  if(enlace!=="" && desc!==""){ this.guardarHistoria() }
  else{ this.AlertMessage("Todos los campos son requeridos", 1500) }
}

async guardarHistoria() {
  this.AlertOption("¿Desea guardar los datos de Historia?");
  const parent: HTMLElement | any = this.containerAlert;
  const btn: HTMLElement | any = parent?.childNodes[0]?.childNodes[0]?.childNodes[1]?.childNodes[0];

  if (btn) { btn.onclick = async () => {
          try { await this.historiaService.editarHistoria(this.formularioEditHistoria.value, this._idhistoria); this.AlertMessage("¡Datos guardados exitosamente!", 1500) } 
          catch (error) { this.AlertMessage("Error :(", 1500) }
      }
  }
}

async obtnerHistorias (){
  let respuestasobtnerHistoria = await this.historiaService.obtenerHistoria()
  this.dataLineaRespuesta = respuestasobtnerHistoria.historia
}

//FIN DE LOS METDOOS DE HISTORIA  

//Metodos de linea de tiempo

async obtenerLinea(){
  const repuestaLinea = await this.lineaService.obtenerLineaTiempo()
  this.dataLinea = repuestaLinea[1].lineas
  console.log(this.dataLinea)
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
ModalTimeLine() {document.getElementById('modal-time-line')?.classList.toggle('modal') }


ModalAddTimeLine() { document.getElementById('modal-time-line-add')?.classList.toggle('modal') }

  async agregarEventoLineaTiempo(){
    this.obtenerLinea()
    console.log(this.formularioAgregarLineaTiempo.value.image)

  }

  async eliminarLineaTiempo(id:any){
    this.AlertOption("¿Borrar Línea de tiempo?")
    const parent: HTMLElement | any = this.containerAlert
    const btn: HTMLElement | any = parent?.childNodes[0]?.childNodes[0]?.childNodes[1]?.childNodes[0]
  
    if (btn) { 
      btn.onclick = async () => {
        try{
          const respuestaDelete = await this.lineaService.eliminarLineaTIempo(id)
          if(respuestaDelete){

            this.obtenerLinea()
            this.AlertMessage("Línea de tiempo eliminada con éxito", 1500)
          }else{this.AlertMessage("Error al eliminar", 1500)}
        } catch(error) {this.AlertMessage("Error :(", 1500) }
      }
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
    body.append('fecha',this.formularioAgregarLineaTiempo.value.fecha)
    body.append('mostrarPor',this.formularioAgregarLineaTiempo.value.mostrarPor)

  }else{
    body.append('titleLineaTiempo', this.formularioEditlineaTiempo.value.titleLineaTiempo)
    body.append('descriptionLineaTiempo',this.formularioEditlineaTiempo.value.descriptionLineaTiempo)
    body.append('fecha',this.formularioAgregarLineaTiempo.value.fecha)
    body.append('mostrarPor',this.formularioAgregarLineaTiempo.value.mostrarPor)
  }
  this.lineaService.sendEdit(body,id)
  .subscribe(res =>{console.log(res), this.obtenerLinea(),this.fileUpdateLineaTiempo = null})
}

  




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

        document.getElementsByClassName('innerdetails')[2]!.innerHTML = sizemedida
        document.getElementsByClassName('innerdetails')[0]!.innerHTML = this.anchoimg + " px"
        document.getElementsByClassName('innerdetails')[1]!.innerHTML = this.altoimg + " px"
        document.getElementById('new-file-input')?.setAttribute('data-content', fileName)
        document.getElementById('img-pre-tl')?.setAttribute('src', img.src)
      }
    }
    lector.readAsDataURL(archivo)
  }
}

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

    this.AlertOption("¿Desea guardar los datos de Línea de Tiempo?")
    const parent: HTMLElement | any = this.containerAlert
    const btn: HTMLElement | any = parent?.childNodes[0]?.childNodes[0]?.childNodes[1]?.childNodes[0]
    if (btn) { btn.onclick = () => {
      this.sendFileTimeLine()
      }}
  }else{ this.AlertMessage("Todos los campos son requeridos", 1500) }
}

sendFileTimeLine():void{

    const body = new FormData()

    if(this.fileTmp){
      body.append('ImgPathLineaTiempo', this.fileTmp.fileRaw, this.fileTmp.fileName);
      body.append('titleLineaTiempo', this.formularioAgregarLineaTiempo.value.titleLineaTiempo)
      body.append('descriptionLineaTiempo',this.formularioAgregarLineaTiempo.value.descriptionLineaTiempo)
      body.append('fecha',this.formularioAgregarLineaTiempo.value.fecha)
      body.append('mostrarPor',this.formularioAgregarLineaTiempo.value.mostrarPor)
    }else{
      body.append('titleLineaTiempo', this.formularioAgregarLineaTiempo.value.titleLineaTiempo)
      body.append('descriptionLineaTiempo',this.formularioAgregarLineaTiempo.value.descriptionLineaTiempo)
      body.append('fecha',this.formularioAgregarLineaTiempo.value.fecha)
      body.append('mostrarPor',this.formularioAgregarLineaTiempo.value.mostrarPor)
    }

    console.log(this.formularioAgregarLineaTiempo.value.fecha)
    this.lineaService.sendPost(body)

    .subscribe(res =>{
      console.log(res),console.log(body), this.obtenerLinea(),this.fileTmp = null
      this.AlertMessage("¡Datos guardados exitosamente!", 1500)
    })
  }

  toUpdateLineaTiempo(event: Event) {



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
          let namefile = archivo.name
  
      document.getElementById('width-update-lt')?.classList.remove('limit')
          document.getElementById('height-update-lt')?.classList.remove('limit')
          document.getElementById('size-update-lt')?.classList.remove('limit')
  
          if(this.anchoimg > 2000){  document.getElementById('width-update-lt')?.classList.add('limit') }
          if(this.altoimg > 1500){ document.getElementById('height-update-lt')?.classList.add('limit') }
          if((size/1024) > 2048 ){  document.getElementById('size-update-lt')?.classList.add('limit') }
  
          document.getElementById('size-update-lt')!.innerHTML = sizemedida
          document.getElementById('width-update-lt')!.innerHTML = this.anchoimg + " px"
          document.getElementById('height-update-lt')!.innerHTML = this.altoimg + " px"
          document.getElementById('file-update-lt')?.setAttribute('data-content', fileName)
          document.getElementById('img-update-tl')?.removeAttribute('src')
          document.getElementById('img-update-tl')?.setAttribute('src', img.src)
  
          const saveButtonTL = document.getElementById('update-time-line')
          if (saveButtonTL) { saveButtonTL.addEventListener('click', () => {
  
            const tituloInput: HTMLInputElement | null = document.getElementById('titulo-update-lt') as HTMLInputElement | null
            const descripcionInput: HTMLInputElement | null = document.getElementById('desc-update-lt') as HTMLInputElement | null
  
  
            let titulo: string = ''
            let descripcion: string = ''
  
            if (tituloInput instanceof HTMLInputElement) { titulo = tituloInput.value }
            if (descripcionInput instanceof HTMLInputElement) { descripcion = descripcionInput.value }
  
            // Mostrando valores de los inputs
            console.log(titulo)
            console.log(descripcion)
  
  if(titulo!=="" && descripcion!==""){
    const innerMessage = document.getElementsByClassName('innermsg')[8]
    if (innerMessage) { innerMessage.innerHTML = "¿Desea guardar los cambios?"
  
  
            document.getElementsByClassName('container-alert')[8]?.classList.add('show')
            document.getElementsByClassName('message')[8]?.classList.add('show')
            document.getElementsByClassName('cont-btns-alert')[8]?.classList.add('show')
  
              document.getElementsByClassName('cancel')[8]?.addEventListener('click', function(){
              document.getElementsByClassName('container-alert')[8]?.classList.remove('show')
              document.getElementsByClassName('message')[8]?.classList.remove('show')
              document.getElementsByClassName('cont-btns-alert')[8]?.classList.remove('show')
            },false)
            document.getElementsByClassName('confirm')[8]?.addEventListener('click', () =>{
              document.getElementsByClassName('container-alert')[8]?.classList.remove('show')
  //************************************************************************ */
  
  
  
  //************************************************************************ */
            },false)
          }
  
        }else{
  
  
          document.getElementsByClassName('cont-btns-alert')[8]?.classList.remove('show')
          // 
        }
          }, false) }
          }
        }
        lector.readAsDataURL(archivo)
      }
  }
  

  async editarModal(id:any) {
    const respuestaid = await this.lineaService.obtenerLineaxID(id)
    this.dataLieneaxId = respuestaid.lineaFiend
    this.tituloModal = this.dataLieneaxId.titleLineaTiempo
    this.descripcionModal = this.dataLieneaxId.descriptionLineaTiempo
    this.fechaModal = this.dataLieneaxId.fecha
    this.mostrarPorModal = this.dataLieneaxId.mostrarPor
  }



  //Fin de los metodos de linea de tiempo





//Metodos de Noticias



async obtnerNoticias (){
  const respuestasobtnerNoticas = await this.noticiasService.obtenerNoticas()
  this.dataLineaRespuesta = respuestasobtnerNoticas.noticias
  console.log(respuestasobtnerNoticas)
}



ModalEditNotice() { document.getElementById('modal-edit-notice')?.classList.toggle('show') }
NewModalNotice() { document.getElementById('modal-new-notice')?.classList.toggle('show') }


async obtenerxidNoticias(id:any){
  const respuestaObtnerid = await this.noticiasService.obtenerxID(id)
  this.dataNoticiasxID = respuestaObtnerid.noticia
  console.log(this.dataNoticiasxID)
  this.tituloNoticia = this.dataNoticiasxID.title
  this.descripcionNoticia = this.dataNoticiasxID.descripcion
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
    body.append('title', this.formularioAgregarNoticias.value.title)
    body.append('descripcion',this.formularioAgregarNoticias.value.descripcion)
    body.append('tipo',this.formularioAgregarNoticias.value.tipo)
  }else{
    body.append('title', this.formularioAgregarNoticias.value.title)
    body.append('descripcion',this.formularioAgregarNoticias.value.descripcion)
    body.append('tipo',this.formularioAgregarNoticias.value.tipo)

  }

  this.noticiasService.sendPost(body)
  .subscribe(res => {console.log(res) ,this.obtnerNoticias(),this.fileTmpNoticia = null})
}


async ObtenerAllnoticas(){
  const dataLineaRespuesta = await this.noticiasService.obtnenerNoticasAll()
  this.dataLineaRespuesta = dataLineaRespuesta.noticias
  console.log(this.dataLineaRespuesta )
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
ShowMore(){ this.ObtenerAllnoticas() }

saveNewNoticia(event: Event): void  {

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

    document.getElementById('width-new-n')?.classList.remove('limit')
        document.getElementById('height-new-n')?.classList.remove('limit')
        document.getElementById('size-new-n')?.classList.remove('limit')

        if(this.anchoimg > 2000){  document.getElementById('width-new-n')?.classList.add('limit') }
        if(this.altoimg > 1500){ document.getElementById('height-new-n')?.classList.add('limit') }
        if((size/1024) > 2048 ){  document.getElementById('size-new-n')?.classList.add('limit') }

        document.getElementById('size-new-n')!.innerHTML = sizemedida
        document.getElementById('width-new-n')!.innerHTML = this.anchoimg + " px"
        document.getElementById('height-new-n')!.innerHTML = this.altoimg + " px"
        document.getElementById('file-noticia')?.setAttribute('data-content', fileName)
        document.getElementById('img-pre-noticia')?.removeAttribute('src')
        document.getElementById('img-pre-noticia')?.setAttribute('src', img.src)


          const tituloInput: HTMLInputElement | null = document.getElementById('titulo-noticia') as HTMLInputElement | null
          const descripcionInput: HTMLTextAreaElement | any = document.getElementById('desc-noticia')

          let titulo: string = ''
          let descripcion: string = ''

          if (tituloInput instanceof HTMLInputElement) { titulo = tituloInput.value }
          if (descripcionInput instanceof HTMLTextAreaElement) { descripcion = descripcionInput.value }

if(titulo!=="" && descripcion!==""){
  this.AlertOption("¿Desea agragar la Noticias?")
  const parent: HTMLElement | any = this.containerAlert
  const btn: HTMLElement | any = parent?.childNodes[0]?.childNodes[0]?.childNodes[1]?.childNodes[0]

  if (btn) {
        btn.onclick = () => {
        this.sendFileNoticia()
        this.guardarNoticia()
}}
      }else{ this.AlertMessage("Todos los campos son requeridos", 1500) }
        }
      }
      lector.readAsDataURL(archivo)
    }
}

async guardarNoticia() { const respuestaEdit = await this.noticiasService.crearNoticia(this.formularioAgregarNoticias.value) }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async eliminarNoticia(id: any) {
  this.AlertOption("¿Desea eliminar la noticia seleccionada?")

  const parent: HTMLElement | any = this.containerAlert
  const btn: HTMLElement | any = parent?.childNodes[0]?.childNodes[0]?.childNodes[1]?.childNodes[0]

  if (btn) {
    btn.onclick = async () => {
      try {
        await this.noticiasService.EliminarNoticia(id)
        this.obtnerNoticias()
        this.AlertMessage("¡Noticia eliminada con éxito!", 1500)
      } catch (error) {
        this.AlertMessage("Error :(", 1500)
      }
    }
  }
}


updateNoticia(event: Event) {

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
        let namefile = archivo.name

    document.getElementById('width-edit-n')?.classList.remove('limit')
        document.getElementById('height-edit-n')?.classList.remove('limit')
        document.getElementById('size-edit-n')?.classList.remove('limit')

        if(this.anchoimg > 2000){  document.getElementById('width-edit-n')?.classList.add('limit') }
        if(this.altoimg > 1500){ document.getElementById('height-edit-n')?.classList.add('limit') }
        if((size/1024) > 2048 ){  document.getElementById('size-edit-n')?.classList.add('limit') }

        document.getElementById('size-edit-n')!.innerHTML = sizemedida
        document.getElementById('width-edit-n')!.innerHTML = this.anchoimg + " px"
        document.getElementById('height-edit-n')!.innerHTML = this.altoimg + " px"
        document.getElementById('img-pre-noticia-edit')?.setAttribute('data-content', fileName)
        document.getElementById('img-pre-noticia-edit')?.removeAttribute('src')
        document.getElementById('img-pre-noticia-edit')?.setAttribute('src', img.src)

        const saveButtonTL = document.getElementById('update-noticia')
        if (saveButtonTL) { saveButtonTL.addEventListener('click', () => {
console.log("TEST 01")

          const tituloInput: HTMLInputElement | null = document.getElementById('title-update-noticia') as HTMLInputElement | null
          const descripcionInput: HTMLTextAreaElement | any = document.getElementById('desc-update-noticia')

          let titulo: string = ''
          let descripcion: string = ''

          if (tituloInput instanceof HTMLInputElement) { titulo = tituloInput.value }
          if (descripcionInput instanceof HTMLTextAreaElement) { descripcion = descripcionInput.value }

if(namefile!=="" && titulo!=="" && descripcion!==""){
  const innerMessage = document.getElementsByClassName('innermsg')[11]
  if (innerMessage) { innerMessage.innerHTML = "¿Desea guardar los cambios?"


          document.getElementsByClassName('container-alert')[11]?.classList.add('show')
          document.getElementsByClassName('message')[11]?.classList.add('show')
          document.getElementsByClassName('cont-btns-alert')[11]?.classList.add('show')

            document.getElementsByClassName('cancel')[11]?.addEventListener('click', function(){
            document.getElementsByClassName('container-alert')[11]?.classList.remove('show')
            document.getElementsByClassName('message')[11]?.classList.remove('show')
            document.getElementsByClassName('cont-btns-alert')[11]?.classList.remove('show')
          },false)
          document.getElementsByClassName('confirm')[11]?.addEventListener('click', () =>{
            document.getElementsByClassName('container-alert')[11]?.classList.remove('show')
          },false)
        }
      }else{
        document.getElementsByClassName('cont-btns-alert')[11]?.classList.remove('show')
        //
      }
        }, false) }
        }
      }
      lector.readAsDataURL(archivo)
    }
}

updateNotice() {
  this.sendFileUpdateNotice()
  this.containeralertUpdateNotice.nativeElement.classList.remove('show') }

  sendFileUpdateNotice():void{

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
    // 
}
  

  ChangeFileBackground(event: Event): void {
    const fileInput = event.target as HTMLInputElement
    const archivo = fileInput.files?.[0]

    // const element = this.fileBg
    // const parent = element?.parentElement?.parentElement as HTMLElement
  
    if (archivo) {
      const lector = new FileReader()
      lector.onload = (eventoLectura: any) => {
        const imagen = new Image()
        imagen.src = eventoLectura.target.result as string
  
        imagen.onload = () => {
          const fileSize: number = archivo.size
          const size: any = fileSize.toFixed(2)
          let medida: string
          let sizemedida: any
  
          if ((size / 1024 / 1024) < 1.0) {
            medida = " KB"
            sizemedida = (size / 1024).toFixed(2).toString() + medida
          } else {
            medida = " MB"
            sizemedida = (size / 1024 / 1024).toFixed(2).toString() + medida
          }
  
          const fileName: string = archivo.name
          let img = new Image()
          const objectURL = URL.createObjectURL(archivo)
          img.src = objectURL
          this.anchoimg = imagen.width
          this.altoimg = imagen.height
  
          const dangerRedElements = document.getElementsByClassName('danger-red')
          dangerRedElements[0]?.classList.remove('limit')
          dangerRedElements[1]?.classList.remove('limit')
          dangerRedElements[2]?.classList.remove('limit')
  
          if (this.anchoimg > 2000) {
            dangerRedElements[0]?.classList.add('limit')
          }
          if (this.altoimg > 1500) {
            dangerRedElements[1]?.classList.add('limit')
          }
          if ((size / 1024) > 2048) {
            dangerRedElements[2]?.classList.add('limit')
          }
  
          // console.log(parent?.children[2]?.children[0])
          

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
  
      const btnSaveBg: HTMLElement | any = document.querySelector('#saveBgImg')
      btnSaveBg?.classList.add('show')
      btnSaveBg.onclick = () => { this.sendFileBackground() }
    }
  }
  
  sendFileBackground(): void {
    this.AlertOption("¿Desea guardar la nueva imagen de fondo?")
    const parent: HTMLElement | any = this.containerAlert
    const btn: HTMLElement | any = parent?.childNodes[0]?.childNodes[0]?.childNodes[1]?.childNodes[0]
  
    if (btn) {
      btn.onclick = () => {
        const body = new FormData()
        if (this.fileBackgrud) {
          body.append('imgPathFondo', this.fileBackgrud.fileRaw, this.fileBackgrud.fileName)
          try {
            this.historiaService.sendback(body, this._idhistoria).subscribe(res => {
              this.AlertMessage("¡Nueva imagen de fondo con éxito!", 1500)
              console.log(res)
              this.obtenerHistoria()
            })
          } catch (error) {
            this.AlertMessage("Error :(", 1500)
          }
        } else {
          this.AlertMessage("Selecciona una imagen de fondo por favor", 1500)
        }
      }
    }
  }
  


getFileBack($event: any): void {
  const [ file ] = $event.target.files
  this.fileBackgrud = {
    fileRaw:file,
    fileName:file.name
  }
}

sendColorbackGord() {
  this.AlertOption("¿Desea cambiar el color de fondo?")
  const parent: HTMLElement | any = this.containerAlert
  const btn: HTMLElement | any = parent?.childNodes[0]?.childNodes[0]?.childNodes[1]?.childNodes[0]

  if (btn) {
      btn.onclick = () => {
          try {
              this.formularioEditarFondoColor.value.colorFondo = this.colorBg
              const body = this.formularioEditarFondoColor.value
              console.log(body)
              this.historiaService.sendback(body, this._idhistoria)
                  .subscribe(res => {
                    console.log(res)
                    this.obtenerHistoria()
                    this.AlertMessage("¡Fondo actualizado exitosamente!", 1500)
                  })
          } catch (error) {
              this.AlertMessage("Error :(", 1500)
          }
      }
  }
}







//Fin de los metodos de fondo de pantalla


//Metodos de Portada



getFilePortada($event: any): void {
  //TODO esto captura el archivo!
  const [ file ] = $event.target.files;
  this.imgPathPrincipal = {
    fileRaw:file,
    fileName:file.name
  }
}









sendFilePortada(): void {
  this.AlertOption("¿Desea guardar la nueva imagen de Portada?")
  const parent: HTMLElement | any = this.containerAlert
  const btn: HTMLElement | any = parent?.childNodes[0]?.childNodes[0]?.childNodes[1]?.childNodes[0]

  if (btn) {
    btn.onclick = () => {
      const body = new FormData()
      if (this.imgPathPrincipal) {
        try {
          body.append('imgPathPortada', this.imgPathPrincipal.fileRaw, this.imgPathPrincipal.fileName)
          this.historiaService.sendPost(body, this._idhistoria)
            .subscribe(res => {
              this.AlertMessage("¡Fondo actualizado exitosamente!", 1500)
              console.log(res)
              this.obtenerHistoria()
            })
        } catch (error) {
          this.AlertMessage("Error :(", 1500)
        }
      } else {
        this.AlertMessage("No hay archivo seleccionado", 1500)
      }
    }
  }
}


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
    document.getElementsByClassName('cont-btns-alert')[1]?.classList.remove('show')
    document.getElementsByClassName('container-alert')[1]?.classList.remove('show')
  },false)
  }
}
}, false)
}

testEmptyPortada(){
   let prefile: any | null = (document.getElementById('file-portada') as HTMLInputElement).value
   if(prefile==null || prefile==undefined || prefile==""){ 
    // 
    }
}


onClick() {
}

//fin de los metodos de portada
 async onSubmit(){}


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

 

 Modal() { document.getElementById('modal-time-line')?.classList.toggle('modal') }

  onClickEditedTimeLineEdited() { this.sendFileTimeLine(); this.containerAlertElementTLEdited.nativeElement.classList.remove('show') }

toggleImgColor(status:number, cont:string){
  document.getElementById('sub-cont-img')?.classList.remove('selected')
  document.getElementById('sub-cont-color')?.classList.remove('selected')
  document.getElementsByClassName('sl-img')[0]?.classList.remove('selected')
  document.getElementsByClassName('sl-color')[0]?.classList.remove('selected')

  document.getElementsByClassName('sl-'+cont)[0]?.classList.add('selected')
  document.getElementById('sub-cont-'+cont)?.classList.add('selected')
  this.statusBackground = status
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
