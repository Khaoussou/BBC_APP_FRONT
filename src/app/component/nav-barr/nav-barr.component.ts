import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-nav-barr',
  templateUrl: './nav-barr.component.html',
  styleUrls: ['./nav-barr.component.css'],
})
export class NavBarrComponent implements OnInit {
  public nom!: string;
  public succursale!: string;
  ngOnInit(): void {
    console.log(localStorage.getItem('user'));
    initFlowbite();
    if (localStorage.getItem('user')) {
      console.log(localStorage.getItem('user'));
    }
  }

  constructor(private router: Router, private logout: LoginService) {}

  disconnect() {
    this.router.navigate(['']);
    this.logout.logout().subscribe((response) => {
      localStorage.removeItem('user');
      localStorage.clear();
      console.log(response);
    });
  }
}
