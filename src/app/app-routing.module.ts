import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './componentes/Cliente/principal/principal.component';
import { UbicacionesComponent } from './componentes/Cliente/ubicaciones/ubicaciones.component';
import { QuieroComprarComponent } from './componentes/Cliente/quiero-comprar/quiero-comprar.component';

import { AlertComponent } from './componentes/Complements/alert/alert.component';
import { YoutubeComponent } from './componentes/Complements/youtube/youtube.component';
import { NoticiasComponent } from './componentes/Cliente/noticias/noticias.component';
import { NuestrosClientesComponent } from './componentes/Cliente/nuestros-clientes/nuestros-clientes.component';
import { ProductosComponent } from './componentes/Cliente/productos/productos.component';
import { NuestroEquipoComponent } from './componentes/Cliente/nuestro-equipo/nuestro-equipo.component';


const routes: Routes = [
  {path:'',redirectTo:'Inicio', pathMatch:'full'},
  {path:'Inicio',title:'inicio',component:PrincipalComponent},
  {path:'ubicaciones',title:'Ubicaciones',component:UbicacionesComponent},
  {path:'quiero-comprar',title:'Quiero Comprar',component:QuieroComprarComponent},
  {path:'alert',title:'alert',component:AlertComponent},
  {path:'youtube',title:'youtube',component:YoutubeComponent},
  {path:'noticas', component:NoticiasComponent},
  {path:'nuestros-clientes', component:NuestrosClientesComponent},
  {path:'productos', component:ProductosComponent},
  {path:'unete-nuestro-equipo', component:NuestroEquipoComponent},
  { path: '**', pathMatch:'full', redirectTo: 'Inicio' }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
