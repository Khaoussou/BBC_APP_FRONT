import { Injectable } from '@angular/core';
import { ServiceMereService } from './mere.service';
import { Caract } from '../model/caract';
import { Observable } from 'rxjs';
import { Response } from '../model/response';

@Injectable({
  providedIn: 'root'
})
export class CaraxtService extends ServiceMereService<Caract> {
  protected override Uri: string = "caract";

  getValue(id : number): Observable<Response<any>> {
    return this.http.get<Response<any>>(this.url + "value/" + id)
  }
}
