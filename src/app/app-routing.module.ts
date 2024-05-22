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
import { NoticiaUnicaComponent } from './componentes/Cliente/noticia-unica/noticia-unica.component';
import { GeneralesComponent } from './componentes/admin/generales/generales.component';
import { NuestrasMarcasComponent } from './componentes/admin/nuestras-marcas/nuestras-marcas.component';
import { EquipoUnicoComponent } from './componentes/Cliente/equipo-unico/equipo-unico.component';
import { loginGuard } from './guards/login.guard';
import { agenteMerting } from './guards/agenteMerting.guard';
import { NoticiasMovilComponent } from './componentes/Cliente/noticias-movil/noticias-movil.component';
import { NuestrosClienteComponent } from './componentes/admin/nuestros-cliente/nuestros-cliente.component';
import { agenteRH } from './guards/rh.guard';
import { LoginPruebaComponent } from './componentes/Complements/login-prueba/login-prueba.component';

const routes: Routes = [
  {path:'',redirectTo:'Inicio', pathMatch:'full'},
  {path:'Inicio',title:'PROCASA',component:PrincipalComponent},
  {path:'ubicaciones',title:'PROCASA | Ubicaciones',component:UbicacionesComponent},
  {path:'quiero-comprar',title:'PROCASA | Quiero Comprar',component:QuieroComprarComponent},
  {path:'admin',title:'Administrador',component: AdminloginComponent},
  {path:'admin/Ubicaciones',title:'Administrador-Ubicaciones', component:AdminUbicacionesComponent, canActivate: [loginGuard,agenteMerting]},
  {path:'admin/Principal',title:'Principal-Admin',component:AdminprincipalComponent, canActivate: [loginGuard,agenteMerting]},
  {path:'admin/Promociones',title:'Principal-Admin',component:PromocionesComponent, canActivate: [loginGuard,agenteMerting]},
  {path:'alert',title:'alert',component:AlertComponent},
  {path:'admin/suscripciones',title:'suscripciones',component:SuscripcionesComponent, canActivate: [loginGuard,agenteMerting]},
  {path:'youtube',title:'youtube',component:YoutubeComponent},
  {path:'admin/usuarios',title:'usuarios',component:UsuariosComponent, canActivate: [loginGuard,agenteMerting]},
  {path:'noticas',component:NoticiasComponent},
  {path:'nuestros-clientes',title:'PROCASA | Nuestros Clientes',component:NuestrosClientesComponent},
  {path:'productos',title:'PROCASA | Productos', component:ProductosComponent},
  {path:'unete-nuestro-equipo',title:'PROCASA | Únete a Nuestro Equipo',component:NuestroEquipoComponent},
  {path:'admin/Productos', component:AdminproductosComponent, canActivate: [loginGuard,agenteMerting]},
  {path:'admin/Equipo', component:EquipoComponent, canActivate: [loginGuard,agenteRH]},
  {path:'noticia',title:'PROCASA | Noticia',component:NoticiaUnicaComponent},
  {path:'noticia/:id', component:NoticiaUnicaComponent},
  {path:'admin/generales', component:GeneralesComponent, canActivate: [loginGuard,agenteMerting]},
  {path:'admin/nuestras-marcas', component:NuestrasMarcasComponent, canActivate: [loginGuard,agenteMerting]},
  {path:'informacion-plaza',title:'PROCASA | Información de Plaza',component:EquipoUnicoComponent},
  {path:'informacion-plaza/:id',title:'PROCASA | Información de Plaza',component:EquipoUnicoComponent},

  {path:'productos/:nuestras-marcas',title:'PROCASA | Nuestras Marcas',component:ProductosComponent},
  {path:'productos/:por-que-procasa',title:'PROCASA | ¿Por qué Procasa?',component:ProductosComponent},
  {path:'productos/:catalogo',title:'PROCASA | Catálogo',component:ProductosComponent},
  {path:'Inicio/:historia',title:'PROCASA | Historia',component:PrincipalComponent},
  {path:'Inicio/:linea-tiempo',title:'PROCASA | Línea del Tiempo',component:PrincipalComponent},
  {path:'Inicio/:mision-vision-valores',title:'PROCASA | Misión, Visión y Valores',component:PrincipalComponent},
  {path:'Inicio/:noticias',title:'PROCASA | Noticias',component:PrincipalComponent},
  {path:'noti',title:'DELETE',component:NoticiasMovilComponent},
  {path:'admin/nuestros-clientes',component:NuestrosClienteComponent},
  {path:'login-prueba',title:'Login de pruebas de Desarrollo',component:LoginPruebaComponent},
  {path:'**',redirectTo:'Inicio', pathMatch:'full'},
]

@NgModule({
  imports: [RouterModule.forRoot(routes,
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
