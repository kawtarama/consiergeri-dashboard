import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api'; // Import MessageService
import { AuthService } from 'src/app/demo/service/auth.service';

@Component({
  // selector: 'app-login',
  providers: [MessageService],
  templateUrl: './login.component.html',
  styles: [`
    :host ::ng-deep .pi-eye,
    :host ::ng-deep .pi-eye-slash {
      transform: scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }
  `],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService // Inject MessageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill in all required fields.',
      });
      return;
    }

    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe(
      (response: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Login successful!',
        });
        localStorage.setItem('token', response.token); // Save the JWT token
        localStorage.setItem('user', JSON.stringify(response.user)); // Save user data
        this.router.navigate(['dashboard']); // Redirect to dashboard
      },
      (error) => {
        console.error('Login failed:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Invalid credentials. Please try again.',
        });
      }
    );
  }
}