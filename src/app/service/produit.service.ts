import { Injectable } from '@angular/core';
import { ServiceMereService } from './mere.service';
import { Produit } from '../model/produit';

@Injectable({
  providedIn: 'root',
})
export class ProduitService extends ServiceMereService<Produit> {
  protected override Uri: string = 'produits';
}
