import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, NgModel } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PrincipalComponent } from './componentes/Cliente/principal/principal.component';
import { HistoriaComponent } from './componentes/Cliente/historia/historia.component';
import { NoticiasComponent } from './componentes/Cliente/noticias/noticias.component';
import { InterceptorService } from './interceptor.service';

import { LineaTiempoComponent } from './componentes/Cliente/linea-tiempo/linea-tiempo.component';
import { FooterComponent } from './componentes/Complements/footer/footer.component';
import { NavbarComponent } from './componentes/Complements/navbar/navbar.component';
import { MisionValorComponent } from './componentes/Cliente/mision-valor/mision-valor.component';
import { QuieroComprarComponent } from './componentes/Cliente/quiero-comprar/quiero-comprar.component';
import { UbicacionesComponent } from './componentes/Cliente/ubicaciones/ubicaciones.component';
import { AdminprincipalComponent } from './componentes/admin/adminprincipal/adminprincipal.component';
import { AdminloginComponent } from './componentes/admin/adminlogin/adminlogin.component';
import { AdminUbicacionesComponent } from './componentes/admin/admin-ubicaciones/admin-ubicaciones.component';
import { MenuComponent } from './componentes/Complements/menu/menu.component';
import { AdminNavbarComponent } from './componentes/admin/admin-navbar/admin-navbar.component';
import { PromocionesComponent } from './componentes/admin/promociones/promociones.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlechaComponent } from './componentes/Complements/flecha/flecha.component';
import { FooterMainComponent } from './componentes/Complements/footer-main/footer-main.component';
import { AlertComponent } from './componentes/Complements/alert/alert.component';
import { SuscripcionesComponent } from './componentes/Cliente/suscripciones/suscripciones.component';
import { YoutubeComponent } from './componentes/Complements/youtube/youtube.component';
import { SafePipe } from './safe.pipe';
import { UsuariosComponent } from './componentes/admin/usuarios/usuarios.component';
import { NgOptimizedImage } from '@angular/common';
import { NoticiasNEWComponent } from './componentes/Complements/noticias-new/noticias-new.component';
import { MostrarPorUbiPipe } from './pipes/mostrar-por-ubi.pipe';
import { MostrarAliasPipe } from './pipes/mostrar-alias.pipe';
import { NuestrosClientesComponent } from './componentes/Cliente/nuestros-clientes/nuestros-clientes.component';
import { ProductosComponent } from './componentes/Cliente/productos/productos.component';
import { MostrarimgsUbicacionPipe } from './pipes/mostrarimgs-ubicacion.pipe';
import { NuestroEquipoComponent } from './componentes/Cliente/nuestro-equipo/nuestro-equipo.component';
import { AdminproductosComponent } from './componentes/admin/adminproductos/adminproductos.component';
import { EquipoComponent } from './componentes/admin/equipo/equipo.component';
import { BackgroundComponent } from './componentes/Complements/background/background.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';
import { NgxUiLoaderModule,NgxUiLoaderConfig } from 'ngx-ui-loader';
import { NavbarWhiteComponent } from './componentes/Complements/navbar-white/navbar-white.component';
import { NoticiaUnicaComponent } from './componentes/Cliente/noticia-unica/noticia-unica.component';
import { GeneralesComponent } from './componentes/admin/generales/generales.component';
import { NuestrasMarcasComponent } from './componentes/admin/nuestras-marcas/nuestras-marcas.component';
@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    HistoriaComponent,
    NoticiasComponent,
    LineaTiempoComponent,
    FooterComponent,
    NavbarComponent,
    MisionValorComponent,
    QuieroComprarComponent,
    UbicacionesComponent,
    AdminprincipalComponent,
    AdminloginComponent,
    AdminUbicacionesComponent,
    MenuComponent,
    AdminNavbarComponent,
    PromocionesComponent,
    FlechaComponent,
    FooterMainComponent,
    AlertComponent,
    SuscripcionesComponent,
    YoutubeComponent,
    SafePipe,
    UsuariosComponent,
    NoticiasNEWComponent,
    MostrarPorUbiPipe,
    MostrarAliasPipe,
    NuestrosClientesComponent,
    ProductosComponent,
    MostrarimgsUbicacionPipe,
    NuestroEquipoComponent,
    AdminproductosComponent,
    EquipoComponent,
    BackgroundComponent,
    NavbarWhiteComponent,
    NoticiaUnicaComponent,
    GeneralesComponent,
    NuestrasMarcasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgOptimizedImage,
    MatIconModule,
    NgxUiLoaderModule.forRoot({
      fgsColor: '#a9182c',
      fgsType: 'three-strings',
      text: 'Cargando, por favor espere...',
      fgsSize: 100,
    })
  
    
  ],
  providers: [NgModel,{provide: HTTP_INTERCEPTORS,useClass: InterceptorService,multi: true,},provideAnimationsAsync('noop')],
  bootstrap: [AppComponent]
})
export class AppModule { }
