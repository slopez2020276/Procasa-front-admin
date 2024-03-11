import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './componentes/Cliente/principal/principal.component';
import { UbicacionesComponent } from './componentes/Cliente/ubicaciones/ubicaciones.component';
import { QuieroComprarComponent } from './componentes/Cliente/quiero-comprar/quiero-comprar.component';
import { AdminloginComponent } from './componentes/admin/adminlogin/adminlogin.component';
import { AdminUbicacionesComponent } from './componentes/admin/admin-ubicaciones/admin-ubicaciones.component';
import { AdminprincipalComponent } from './componentes/admin/adminprincipal/adminprincipal.component';
import { PromocionesComponent } from './componentes/admin/promociones/promociones.component';
import { AlertComponent } from './componentes/Complements/alert/alert.component';
import { SuscripcionesComponent } from './componentes/Cliente/suscripciones/suscripciones.component';
import { YoutubeComponent } from './componentes/Complements/youtube/youtube.component';
import { UsuariosComponent } from './componentes/admin/usuarios/usuarios.component';
import { NoticiasComponent } from './componentes/Cliente/noticias/noticias.component';
import { NuestrosClientesComponent } from './componentes/Cliente/nuestros-clientes/nuestros-clientes.component';
import { ProductosComponent } from './componentes/Cliente/productos/productos.component';
import { NuestroEquipoComponent } from './componentes/Cliente/nuestro-equipo/nuestro-equipo.component';
import { AdminproductosComponent } from './componentes/admin/adminproductos/adminproductos.component';
import { EquipoComponent } from './componentes/admin/equipo/equipo.component';

const routes: Routes = [
  {path:'',redirectTo:'Inicio', pathMatch:'full'},
  {path:'Inicio',title:'inicio',component:PrincipalComponent},
  {path:'ubicaciones',title:'Ubicaciones',component:UbicacionesComponent},
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
  {path:'admin/Productos', component:AdminproductosComponent},
  {path:'admin/Equipo', component:EquipoComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
