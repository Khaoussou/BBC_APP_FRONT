import { Injectable } from '@angular/core';
import { ServiceMereService } from './mere.service';
import { Marque } from '../model/marque';

@Injectable({
  providedIn: 'root'
})
export class MarqueService extends ServiceMereService<Marque> {
  protected override Uri: string = "marques";
}
