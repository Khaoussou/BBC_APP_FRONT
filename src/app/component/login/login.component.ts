import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public form!: FormGroup;
  constructor(private loginService: LoginService, private router: Router) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    this.loginService.login(this.form.value).subscribe((response) => {
      if ('token' in response) {
        localStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['/vente']);
        console.log(localStorage.getItem('user'));
      } else {
        this.router.navigate(['']);
        localStorage.removeItem('user');
        localStorage.clear();
      }
    });
    this.form.reset();
  }

  
}
