import { Injectable } from '@angular/core';
import { ServiceMereService } from './mere.service';
import { Vente } from '../model/vente';

@Injectable({
  providedIn: 'root',
})
export class VenteService extends ServiceMereService<Vente> {
  protected override Uri: string = 'commandes';
}
