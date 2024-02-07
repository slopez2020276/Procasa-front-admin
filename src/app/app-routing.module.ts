import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { UbicacionesComponent } from './componentes/ubicaciones/ubicaciones.component';
import { QuieroComprarComponent } from './componentes/quiero-comprar/quiero-comprar.component';
import { AdminloginComponent } from './componentes/adminlogin/adminlogin.component';
import { AdminUbicacionesComponent } from './componentes/admin-ubicaciones/admin-ubicaciones.component';
import { AdminprincipalComponent } from './componentes/adminprincipal/adminprincipal.component';
import { PromocionesComponent } from './componentes/promociones/promociones.component';
import { AlertComponent } from './componentes/alert/alert.component';
import { SuscripcionesComponent } from './componentes/suscripciones/suscripciones.component';
import { YoutubeComponent } from './componentes/youtube/youtube.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { PruebaMapsComponent } from './componetes/prueba-maps/prueba-maps.component';
import { PruebaMaps2Component } from './componetes/prueba-maps2/prueba-maps2.component';
import { NoticiasComponent } from './componentes/noticias/noticias.component';
import { NuestrosClientesComponent } from './nuestros-clientes/nuestros-clientes.component';
import { ProductosComponent } from './productos/productos.component';
import { NuestroEquipoComponent } from './nuestro-equipo/nuestro-equipo.component';

const routes: Routes = [
  {path:'',redirectTo:'Inicio', pathMatch:'full'},
  {path:'Inicio',title:'inicio',component:PrincipalComponent},
  {path:'ubicaciones',title:'Ubicaciones',component:UbicacionesComponent},
  {path:'pruebaMaps',title:'Maps Prueba',component:PruebaMapsComponent},
  {path:'pruebaMaps2',title:'Maps Prueba',component:PruebaMaps2Component},
  {path:'quiero-comprar',title:'Quiero Comprar',component:QuieroComprarComponent},
  {path:'admin',title:'Administrador', component: AdminloginComponent},
  {path:'admin/Ubicaciones',title:'Administrador-Ubicaciones', component:AdminUbicacionesComponent},
  {path:'admin/Principal',title:'Principal-Admin',component:AdminprincipalComponent},
  {path:'admin/Promociones',title:'Principal-Admin',component:PromocionesComponent},
  {path:'alert',title:'alert',component:AlertComponent},
  {path:'admin/suscripciones',title:'suscripciones',component:SuscripcionesComponent},
  {path:'youtube',title:'youtube',component:YoutubeComponent},
  {path:'admin/usuarios',title:'usuarios',component:UsuariosComponent},
  {path:'noticas', component:NoticiasComponent},
  {path:'nuestros-clientes', component:NuestrosClientesComponent},
  {path:'productos', component:ProductosComponent},
  {path:'unete-nuestro-equipo', component:NuestroEquipoComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
