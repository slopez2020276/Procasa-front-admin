import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { HistoriaComponent } from './componentes/historia/historia.component';
import { NoticiasComponent } from './componentes/noticias/noticias.component';
import { LineaTiempoComponent } from './componentes/linea-tiempo/linea-tiempo.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { MisionValorComponent } from './componentes/mision-valor/mision-valor.component';
import { QuieroComprarComponent } from './componentes/quiero-comprar/quiero-comprar.component';
import { UbicacionesComponent } from './componentes/ubicaciones/ubicaciones.component';
import { MapsComponent } from './componentes/maps/maps.component';
import { AdminprincipalComponent } from './componentes/adminprincipal/adminprincipal.component';
import { AdminloginComponent } from './componentes/adminlogin/adminlogin.component';
import { AdminUbicacionesComponent } from './componentes/admin-ubicaciones/admin-ubicaciones.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { AdminNavbarComponent } from './componentes/admin-navbar/admin-navbar.component';
import { PromocionesComponent } from './componentes/promociones/promociones.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlechaComponent } from './componentes/flecha/flecha.component';
import { FooterMainComponent } from './componentes/footer-main/footer-main.component';
import { AlertComponent } from './componentes/alert/alert.component';
import { SuscripcionesComponent } from './componentes/suscripciones/suscripciones.component';
import { YoutubeComponent } from './componentes/youtube/youtube.component';
import { SafePipe } from './safe.pipe';
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
    MapsComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
