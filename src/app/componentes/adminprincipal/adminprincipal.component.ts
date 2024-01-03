import { Component, OnInit, inject } from '@angular/core';
import { HistoriaService } from '../../services/historia.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-adminprincipal',
  templateUrl: './adminprincipal.component.html',
  styleUrl: './adminprincipal.component.css'
})
export class AdminprincipalComponent implements OnInit {

  formulario: FormGroup
  historiaService = inject(HistoriaService)
  data: any
  _idhistoria: any
  textoHistoria


  constructor(){
    this.formulario = new FormGroup({
      DescripcionHistoria: new FormControl('ingrese la historia por favor ')
    })

  }


  IframeVideo() {
    const src: any = (document.getElementById('iframe-value') as HTMLInputElement | null)?.value;
          document.getElementById('iframe-preview')?.removeAttribute('src')
          document.getElementById('iframe-preview')?.setAttribute('src', src)
          // console.log(document.getElementById('iframe-preview'));
  }


  async ngOnInit()  {
    const responsive = await this.historiaService.obtenerHistoria()
    this.data = responsive.historia[0]
    this.textoHistoria = responsive.historia[0].DescripcionHistoria
    this._idhistoria = responsive.historia[0]._id
    console.log(this.textoHistoria)
    console.log(this.data)

  }
  InputFile() {
    const inputfile: any = (document.getElementById('file-portada') as HTMLInputElement | null)?.value;
    document.getElementById('file-portada')?.setAttribute('data-content', inputfile);
    document.getElementById('preview-portada')?.removeAttribute('src');
    document.getElementById('preview-portada')?.setAttribute('src', "../../../assets/img/"+inputfile.slice(12));
    console.log(inputfile.slice(12));
}

  DeleteImg(){
  document.getElementById('preview-portada')?.removeAttribute('src');
}

EditarHistoria(){

}


Modal() {
  document.getElementById('modal-time-line')?.classList.toggle('modal')
}


 async onSubmit(){
    const response = await this.historiaService.editarHistoria(this.formulario.value,this._idhistoria)
    console.log(response)
  }


}
