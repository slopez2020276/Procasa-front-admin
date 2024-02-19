import { Component } from '@angular/core'


@Component({
  selector: 'app-adminproductos',
  templateUrl: './adminproductos.component.html',
  styleUrl: './adminproductos.component.css'
})
export class AdminproductosComponent {
  ProductToSearch: any
  subCount: number = 0
  subsArray: number[] = []
  subsArrayB: number[] = []
  categoryArray: number[] = []
  subCategoryArray: number[] = []
  productArray: number[] = []
  inputEmpty:string = "Seleccionar archivo"
  inputEmptyEdit:string = "Seleccionar archivo"

ModalProduct(type:string){ document.getElementById('modal-'+type+'-product')?.classList.toggle('show') }

DeleteProduct(event: MouseEvent){
  const node = event.target as HTMLElement | null
  const parent = node?.parentNode?.parentNode?.childNodes[4] as HTMLElement | undefined

  parent?.classList.add('show')
  const inner = parent?.childNodes[0]?.childNodes[0] as HTMLElement | undefined
  const btns = parent?.childNodes[0]?.childNodes[2] as HTMLElement | undefined
  inner?.classList.add('show')
  inner!.innerHTML = "¿Desea eliminar el producto?"
  btns?.classList.add('show')
}





FileEdit(event: Event, idfile:string): void  {

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

document.getElementsByClassName('innerdetails')[4]!.innerHTML = imagen.width + " px"
document.getElementsByClassName('innerdetails')[5]!.innerHTML = imagen.height + " px"
document.getElementsByClassName('innerdetails')[7]!.innerHTML = sizemedida
        // document.getElementById('new-file-input')?.setAttribute('data-content', fileName)
        this.inputEmptyEdit = fileName
        document.getElementById(idfile)?.setAttribute('src', img.src)
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




async AlertConfirm(event: MouseEvent) {
  const node = event.target as HTMLElement | null
  const parent = node?.parentNode?.parentNode?.parentNode?.children[3] as HTMLElement | undefined
  parent?.classList.add('show')
  const inner = parent?.childNodes[0]?.childNodes[0] as HTMLElement | undefined
  const btns = parent?.childNodes[0]?.childNodes[2] as HTMLElement | undefined
  inner?.classList.add('show')
  inner!.innerHTML = "¿Desea guardar los datos de producto?"
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
  const parent = node?.parentNode?.parentNode?.parentNode?.parentNode?.childNodes[5] as HTMLElement | undefined
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

eliminarProducto(){

}



}
