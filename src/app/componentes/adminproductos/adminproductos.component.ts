import { Component, OnInit, inject } from '@angular/core'
import { ProductosService } from '../../services/productos.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-adminproductos',
  templateUrl: './adminproductos.component.html',
  styleUrl: './adminproductos.component.css'
})
export class AdminproductosComponent implements OnInit {
  
  productosServices= inject(ProductosService)

  formularioAgregarProducto : FormGroup
  formularioEditarProducto : FormGroup
  formularioCategoria : FormGroup
  forumlarioSubCategoria : FormGroup


  private fileTmp: any
  private fileTmpEdit: any

  ProductToSearch: any
  dataProductos: any
  dataCategorias: any
  dataItems: any
  idCategoria: any
  subCount: number = 0
  subsArray: number[] = []
  subsArrayB: number[] = []
  categoryArray: number[] = []
  categoryAddArray: number[] = []
  categorySubArray: number[] = []
  subCategoryArray: number[] = []
  addItemsArray: number[] = []
  productArray: number[] = []
  inputEmpty:string = "Seleccionar archivo"
  inputEmptyEdit:string = "Seleccionar archivo"
  addProduct: FormControl | any
  Alert: Boolean | any
  inputEmptyB
  srcPreviewEdit
  inputControl

  containerAlert: HTMLElement | any
  widthLimit
  heightLimit
  sizeLimit




  nombreProducto: string = ""
  IdProducto: string = ""
 


constructor(){
    this.formularioAgregarProducto = new FormGroup({
      nombreProducto : new FormControl(),
      inputControl : new FormControl(),
    })
    this.formularioEditarProducto = new FormGroup({
      nombreProducto : new FormControl(),
    })
    this.formularioCategoria = new FormGroup({
      nombreCategoria: new FormControl(),
    })
    this.forumlarioSubCategoria = new FormGroup({
      items: new FormControl(),
    })
}

ModalProduct(type:string){ document.getElementById('modal-'+type+'-product')?.classList.toggle('show') }

ngOnInit(): void {
  this.containerAlert = document.getElementById('background-alert')
  this.obtenerProductos()
}


getFile($event: any): void {
  //TODO esto captura el archivo!
  const [ file ] = $event.target.files;
  this.fileTmp = {
    fileRaw:file,
    fileName:file.name
  }
}




getFileEditProducto($event: any): void {
  //TODO esto captura el archivo!
  const [ file ] = $event.target.files;
  this.fileTmpEdit = {
    fileRaw:file,
    fileName:file.name
  }
}



sendFileEdit():void{
  const body = new FormData()


  if(this.fileTmpEdit) {

    body.append('imgPath', this.fileTmpEdit.fileRaw, this.fileTmpEdit.fileName)
    body.append('nombreProducto', this.formularioEditarProducto.value.nombreProducto)
  }else{
    body.append('nombreProducto', this.formularioEditarProducto.value.nombreProducto)
  }
    this.productosServices.EditarProducto(body,this.IdProducto)
    .subscribe(res =>{
          this.AlertMessage("¡Producto agregado exitosamente!", 1500)
      console.log(res), this.obtenerProductos(),this.fileTmpEdit = null})
      this.formularioAgregarProducto.reset()
 
}

sendFile():void{
  const body = new FormData()
    body.append('imgPath', this.fileTmp.fileRaw, this.fileTmp.fileName)
    body.append('nombreProducto', this.formularioAgregarProducto.value.nombreProducto)
    
    this.productosServices.CrearProducto(body)
    .subscribe(res =>{
          this.AlertMessage("¡Producto agregado exitosamente!", 1500)
      console.log(res), this.obtenerProductos(),this.fileTmp = null})
      this.formularioAgregarProducto.reset()
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

generarSub() { const newSubIndex = this.subsArray.length + 1; this.subsArray.push(newSubIndex) }
eliminarUltimoSub() { if (this.subsArray.length > 0) { this.subsArray.pop() } }

generarProduct() { const newProIndex = this.productArray.length + 1; this.productArray.push(newProIndex) }
eliminarUltimoProducto() { if (this.productArray.length > 0) { this.productArray.pop() } }

generarSubB() { const newSubIndex = this.subsArrayB.length + 1; this.subsArrayB.push(newSubIndex) }
eliminarUltimoSubB() { if (this.subsArrayB.length > 0) { this.subsArrayB.pop() } }

generarCate() { const newSubIndex = this.categoryArray.length + 1; this.categoryArray.push(newSubIndex) }
EliminarUltimaCate() { if (this.categoryArray.length > 0) { this.categoryArray.pop() } }

generarSubCate() { const newSubIndex = this.subCategoryArray.length + 1; this.subCategoryArray.push(newSubIndex) }
EliminarUltimaSubCate() { if (this.subCategoryArray.length > 0) { this.subCategoryArray.pop() } }

generarnewCate() { const newSubIndex = this.categoryAddArray.length + 1; this.categoryAddArray.push(newSubIndex) }
EliminarUltimaSubCat() { if (this.categoryAddArray.length > 0) { this.categoryAddArray.pop() } }

generarnewSubCate() { const newSubIndex = this.categorySubArray.length + 1; this.categorySubArray.push(newSubIndex) }
EliminarUltimaSub() { if (this.categorySubArray.length > 0) { this.categorySubArray.pop() } }

addItem() { const newSubIndex = this.addItemsArray.length + 1; this.addItemsArray.push(newSubIndex) }
deleteItem() { if (this.addItemsArray.length > 0) { this.addItemsArray.pop() } }








openAddItem(event: Event) {
  const node = event.target as HTMLElement | null
  const parent = node?.parentNode?.parentNode?.childNodes[5] as HTMLElement | undefined
  
  parent?.classList.add('show')
}

closeThisModal(event: Event){
  const node = event.target as HTMLElement | null
  const parent = node?.parentNode as HTMLElement | undefined

  parent?.classList.remove('show')
}


toggleEdit(event: Event) {
const node = event.target as HTMLElement | null
const edit = node?.parentElement?.children[2] as HTMLElement | undefined
node!.style.display = "none"
edit!.style.display = "flex"
}

toggleSave(event: Event) {
const node = event.target as HTMLElement | null
const edit = node?.parentElement?.children[1] as HTMLElement | undefined
node!.style.display = "none"
edit!.style.display = "flex"
}



SaveNewCategory(){ console.log("SAVE CATEGORY") }

SaveNewSubCategory(){ console.log("SAVE SUB CATEGORY") }



OpenAddCategory(event: MouseEvent){
  const node = event.target as HTMLElement | null
  const parent = node?.parentNode?.parentNode?.parentNode?.parentNode?.childNodes[3] as HTMLElement | undefined
  
  parent?.classList.add('show')
}

OpenAddSubCategory(event: MouseEvent){
  const node = event.target as HTMLElement | null
  const parent = node?.parentNode?.parentNode?.parentNode?.parentNode?.children[6] as HTMLElement | undefined
  parent?.classList.add('show')
}


CloseAddCategory(event: MouseEvent){
  const node = event.target as HTMLElement | null
  const parent = node?.parentNode as HTMLElement | undefined

  parent?.classList.remove('show')
}

CloseAddSubCategory(event: MouseEvent){
  const node = event.target as HTMLElement | null
  const parent = node?.parentNode as HTMLElement | undefined
  parent?.classList.remove('show')
}


obtenerProductos(){
  this.productosServices.obtenerProductos().subscribe(
    (res:any) => {
      this.dataProductos = res.productosEncontrados
      console.log(this.dataProductos)

    }
  )
  console.log(this.dataProductos)
}








async eliminarProducto(id:any){
  const productoDelete = await this.productosServices.eliminarProductos(id)
if(productoDelete){
  this.AlertMessage("¡Producto eliminado!", 1500)
  console.log(productoDelete)
  this.obtenerProductos()
}else{ this.AlertMessage("Error al eliminar", 1500) }
}





openAddCategory(event: MouseEvent){

  
  const node = event.target as HTMLElement | null
  const parent = node?.parentNode?.parentNode as HTMLElement | undefined
  const modal = parent?.childNodes[4] as HTMLAnchorElement | undefined

  modal?.classList.add('show')
}


saveEditedProduct(event: MouseEvent){
  this.AlertOption("¿Desea guardar los cambios?")
  const parent: HTMLElement | any = this.containerAlert
  const btn: HTMLElement | any = parent?.childNodes[0]?.childNodes[0]?.childNodes[1]?.childNodes[0]

  if (btn) { 
    btn.onclick = () => {
      
      this.sendFileEdit()
      
      
      
      }
  }
}




openEditItems(event: MouseEvent ) {
  const node = event.target as HTMLElement | null
  const parent = node?.parentNode?.parentNode?.parentNode?.parentNode as HTMLElement | undefined
  const item = parent?.children[4] as HTMLElement | undefined
  
  item?.classList.add('show')
}


DeleteProduct(id:any) {
  this.AlertOption("¿Desea eliminar el producto seleccionado?")
  const parent: HTMLElement | any = this.containerAlert
  const btn: HTMLElement | any = parent?.childNodes[0]?.childNodes[0]?.childNodes[1]?.childNodes[0]

  if (btn) { btn.onclick = () => {

    this.eliminarProducto(id)



    }
  }
}



SaveNewProduct(event: MouseEvent){
  this.AlertOption("¿Desea guardar el nuevo Producto?")
  const parent: HTMLElement | any = this.containerAlert
  const btn: HTMLElement | any = parent?.childNodes[0]?.childNodes[0]?.childNodes[1]?.childNodes[0]

  if (btn) { btn.onclick = () => {
          this.sendFile()
          // this.AlertMessage("¡Producto agregado exitosamente!", 1500)
    }
  }
}

async getProductToSearch(id:any){
  const product = await  this.productosServices.obtenerProducto(id)
  console.log(product)
  this.nombreProducto = product.productoFinded.nombreProducto
  this.IdProducto = product.productoFinded._id
}
  async agregarCateoria(){
    const res = await this.productosServices.CrearCategoria(this.IdProducto,this.formularioCategoria.value)
    console.log(res)
    this.obtenerProductos()
    this.formularioCategoria.reset()
  
  }

  async obtenerCategoriasxId(){
    const res = await this.productosServices.ObtenerCategorasxId(this.IdProducto)
    this.dataCategorias = res.categorias
    console.log(res)
  
  }


  async ObteerItemsxCategoria(idCategoria:any  ){
    const res = await this.productosServices.ObteerItemsxCategoria(this.IdProducto,idCategoria)
    this.dataItems = res.items
    this.idCategoria = idCategoria
    console.log(res)
  }


  async agregarItem(){
    const res = await this.productosServices.CrearItem(this.IdProducto,this.idCategoria,this.forumlarioSubCategoria.value)
    console.log(res)
    this.obtenerProductos()
    this.obtenerCategoriasxId()
     this.ObteerItemsxCategoria(this.idCategoria)
    this.forumlarioSubCategoria.reset()
  
  }

  async eliminarCategoria(idCategoria:any){
    const res = await this.productosServices.eliminarCategoria(this.IdProducto,idCategoria)
    console.log(res)
    this.obtenerProductos()
    this.obtenerCategoriasxId()
  }

  async eliminarItem(idItem:any){
    const res = await this.productosServices.eliminarItem(this.IdProducto,this.idCategoria,idItem)
    console.log(res)
    this.obtenerProductos()
    this.obtenerCategoriasxId()
     this.ObteerItemsxCategoria(this.idCategoria)
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
SystemAlert() {
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
