import { Component } from '@angular/core';

@Component({
  selector: 'app-adminprincipal',
  templateUrl: './adminprincipal.component.html',
  styleUrl: './adminprincipal.component.css'
})
export class AdminprincipalComponent {
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


}
