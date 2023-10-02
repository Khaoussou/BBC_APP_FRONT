import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Response } from '../model/response';
import { Produit } from '../model/produit';

@Injectable({
  providedIn: 'root',
})
export class FormServiceService {
  protected url = environment.localhost;

  constructor(protected http: HttpClient) {}
  search(code: number): Observable<Response<Produit>> {
    return this.http.get<Response<Produit>>(this.url + 'search/' + code);
  }
}
