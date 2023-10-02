import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Login } from '../model/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public isLogedIn: boolean = false;
  public token: string = '';
  private url: string = environment.localhost;
  constructor(private http: HttpClient) {}

  login(body: FormGroup): Observable<Login> {
    this.isLogedIn = true;
    return this.http.post<Login>(this.url + 'login', body);
  }

  logout() {
    this.isLogedIn = false;
    const user = localStorage.getItem('user');
    const connect = JSON.parse(user!);
    this.token = connect.token;
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.token });
    return this.http.get(this.url + 'logout', { headers: headers });
  }
}
