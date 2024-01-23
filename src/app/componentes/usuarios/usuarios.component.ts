import { Component } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

modalAddUser() { document.getElementById('cont-modal-add')?.classList.toggle('open-add') }

}
