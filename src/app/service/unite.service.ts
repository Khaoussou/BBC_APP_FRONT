import { Injectable } from '@angular/core';
import { ServiceMereService } from './mere.service';
import { Unite } from '../model/unite';

@Injectable({
  providedIn: 'root',
})
export class UniteService extends ServiceMereService<Unite> {
  protected override Uri: string = 'unites';
}
