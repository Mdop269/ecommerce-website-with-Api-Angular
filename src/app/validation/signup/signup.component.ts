import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [
    FormsModule,
    RouterModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  email = '';
  password = '';

  constructor(private router: Router) {}

  signup() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find((u: any) => u.email === this.email)) {
        alert('User already exists!');
      } else {
        users.push({ email: this.email, password: this.password, cart: [] });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Signup successful!');
        this.router.navigate(['/login']);
      }
    }
  }

}
