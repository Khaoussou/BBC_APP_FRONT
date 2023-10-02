import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VenteComponent } from './component/vente/vente.component';
import { ListerProduitComponent } from './component/produit/produit.component';
import { AddProduitComponent } from './component/produit/add-produit/add-produit.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { NavBarrComponent } from './component/nav-barr/nav-barr.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'vente', component: VenteComponent, canActivate: [AuthGuard] },
  {
    path: 'lister',
    component: ListerProduitComponent,
    canActivate: [AuthGuard],
  },
  { path: 'add', component: AddProduitComponent, canActivate: [AuthGuard] },
  { path: 'nav', component: NavBarrComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
