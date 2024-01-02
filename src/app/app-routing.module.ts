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

const routes: Routes = [
  {path:'',title:'Inicio',component:PrincipalComponent},
  {path:'ubicaciones',title:'Ubicaciones',component:UbicacionesComponent},
  {path:'quiero-comprar',title:'Quiero Comprar',component:QuieroComprarComponent},
  {path:'admin',title:'Administrador', component: AdminloginComponent},
  {path:'admin/Ubicaciones',title:'Administrador-Ubicaciones', component:AdminUbicacionesComponent},
  {path:'admin/Principal',title:'Principal-Admin',component:AdminprincipalComponent},
  {path:'admin/Promociones',title:'Principal-Admin',component:PromocionesComponent},
  {path:'alert',title:'alert',component:AlertComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
