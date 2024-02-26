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
  private fileTmp: any

  ProductToSearch: any
  dataProductos: any
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
  containerAlert: HTMLElement | any
  inputEmptyB
  srcPreviewEdit
 


constructor(){
    this.formularioAgregarProducto = new FormGroup({
      nombreProducto : new FormControl(),
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

sendFile():void{

  const body = new FormData()

  if(this.fileTmp){
    body.append('imgPath', this.fileTmp.fileRaw, this.fileTmp.fileName);
    body.append('nombreProducto', this.formularioAgregarProducto.value.nombreProducto)
   console.log(this.formularioAgregarProducto.value.nombreProducto)

  }else{
    body.append('nombreProducto', this.formularioAgregarProducto.value.nombreProducto)

  }

  console.log(this.formularioAgregarProducto.value.nombreProducto)
  this.productosServices.CrearUbicacion(body)
  .subscribe(res =>{console.log(res), this.obtenerProductos(),this.fileTmp = null})
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




  FileEdit(event: Event): void {
    const fileInput = event.target as HTMLInputElement
    const parent: HTMLElement | any = fileInput?.parentElement?.parentElement?.parentElement
    const clean: HTMLElement | undefined = parent?.children[0]?.children[0]?.children[1]
    
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


          if (parent) {
            console.log(parent)
            
            parent.children[0].children[1].children[0].children[0].innerHTML = imagen.width + " px"
            parent.children[0].children[1].children[1].children[0].innerHTML = imagen.height + " px"
            parent.children[0].children[1].children[2].children[0].innerHTML = sizemedida
            const attr: HTMLElement | undefined = parent.children[0].children[0].children[0]
            const img: HTMLElement | undefined = parent.children[1].children[0]
            attr?.setAttribute('data-content', fileName)
            attr?.setAttribute('src', fileName)
            img?.setAttribute('src', imagen.src)
            
            clean?.addEventListener('click',() => {
              parent.children[0].children[1].children[0].children[0].innerHTML = ''
              parent.children[0].children[1].children[1].children[0].innerHTML = ''
              parent.children[0].children[1].children[2].children[0].innerHTML = ''
              attr?.setAttribute('data-content', 'seleccionar archivo')
              attr?.setAttribute('src', '')
              img?.setAttribute('src', '')
            }, false)
            
        } 
        }
      }
      lector.readAsDataURL(archivo)
    }
  }






/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

FileAdd(event: Event, idfile:string): void  {

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

const saveButtonTL = document.getElementById('save-new-tili')
if (saveButtonTL) {
  saveButtonTL.addEventListener('click', () => {

}, false) }

document.getElementsByClassName('innerdetails')[0]!.innerHTML = imagen.width + " px"
document.getElementsByClassName('innerdetails')[1]!.innerHTML = imagen.height + " px"
document.getElementsByClassName('innerdetails')[3]!.innerHTML = sizemedida
        // document.getElementById('new-file-input')?.setAttribute('data-content', fileName)
        this.inputEmpty = fileName
        document.getElementById(idfile)?.setAttribute('src', img.src)
      }
    }
    lector.readAsDataURL(archivo)
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




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






SaveNewCategory(){
  console.log("SAVE CATEGORY")
}

SaveNewSubCategory(){
  console.log("SAVE SUB CATEGORY")

}



OpenAddCategory(event: MouseEvent){
  const node = event.target as HTMLElement | null
  const parent = node?.parentNode?.parentNode?.parentNode?.parentNode?.childNodes[4]?.childNodes[4] as HTMLElement | undefined
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
      console.log(this.dataProductos[0].categorias[1].items)
    }
  )
}








eliminarProducto(){

}





openAddCategory(event: MouseEvent){
  const node = event.target as HTMLElement | null
  const parent = node?.parentNode?.parentNode as HTMLElement | undefined
  const modal = parent?.childNodes[5] as HTMLAnchorElement | undefined
    
  modal?.classList.add('show')
}


saveEditedProduct(event: MouseEvent){
}



openEditItems(event: MouseEvent) {
  const node = event.target as HTMLElement | null
  const parent = node?.parentNode?.parentNode?.parentNode as HTMLElement | undefined
  const item = parent?.childNodes[3] as HTMLElement | undefined  
  item?.classList.add('show')
}

// EVENTOS DE ELIMINACIÓN CONFIRMADA ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////777

confirmedDeleteProduct(event: MouseEvent) {
  const node = event.target as HTMLElement | null
  const parent = node?.parentNode?.parentNode?.parentNode?.parentNode as HTMLElement | undefined
  const message = parent?.childNodes[7] as HTMLElement | undefined
        message?.classList.add('show')
        const inner = message?.childNodes[0] as HTMLElement | undefined
        inner!.innerHTML = "¡Noticia eliminada con éxito!"
        
        setTimeout(() => {
          inner!.innerHTML = ""
          message?.classList.remove('show')
    }, 1500)
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



async DeleteProduct() {
  this.AlertOption("¿Desea eliminar el producto seleccionado?")
  const parent: HTMLElement | any = this.containerAlert
  const btn: HTMLElement | any = parent?.childNodes[0]?.childNodes[0]?.childNodes[1]?.childNodes[0]
  const btnClickPromise = new Promise<void>((resolve) => {
    const clickHandler = () => { resolve()
      
      // B A C K E N D !! -----------------------------
      this.AlertMessage("¡Eliminado exitosamente!",1500)


      btn.removeEventListener('click', clickHandler) }; btn?.addEventListener('click', clickHandler)
    })
  await btnClickPromise
}

SaveNewProduct(){
  this.AlertOption("¿Desea guardar el nuevo Producto?")
  const parent: HTMLElement | any = this.containerAlert
  const btn: HTMLElement | any = parent?.childNodes[0]?.childNodes[0]?.childNodes[1]?.childNodes[0]

  if (btn) { 
    btn.onclick = () => {
          // A C T I O N 
    }
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
