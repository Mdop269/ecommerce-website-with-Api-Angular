import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
import { LocalstorageService } from '../service/localstorage.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  

  constructor(private router: Router, private LocalstorageService : LocalstorageService) {
    if (typeof window !== 'undefined' && window.localStorage) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
      if (currentUser) {
        this.router.navigate(['/products']); // If already logged in, redirect to products page
      }
    }
  }

  login() {
  if (typeof window !== 'undefined' && window.localStorage) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => u.email === this.email && u.password === this.password);
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.LocalstorageService.saveCart(user.cart)
        this.router.navigate(['products']);
      } else {
        alert('Invalid credentials!');
      }
    }
  }

}
