import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarrComponent } from './component/nav-barr/nav-barr.component';
import { VenteComponent } from './component/vente/vente.component';
import { SlideBarrComponent } from './component/vente/slide-barr/slide-barr.component';
import { TableComponent } from './component/vente/table/table.component';
import { FormComponent } from './component/vente/slide-barr/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProduitComponent } from './component/produit/add-produit/add-produit.component';
import { ListerProduitComponent } from './component/produit/produit.component';
import { ProduitComponent } from './component/produit/lister-produit/lister-produit.component';
import { LoginComponent } from './component/login/login.component';
import { AuthService } from './service/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarrComponent,
    VenteComponent,
    SlideBarrComponent,
    TableComponent,
    FormComponent,
    AddProduitComponent,
    ListerProduitComponent,
    ProduitComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
