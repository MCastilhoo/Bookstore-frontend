import { Component, inject, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.css',
})
export class AuthModalComponent {
  private toastService = inject(ToastrService)
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  onClose = output<void>();

  isSignUpActive = signal(false);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  toggleForm() {
    this.isSignUpActive.update((val) => !val);
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.getRawValue();

      const formData = new FormData();
      formData.append('userEmail', email!);
      formData.append('password', password!);

      this.authService.login(email!, password!).subscribe({
        next: (res) => {
          console.log('Login realizado com sucesso', res);
          this.onClose.emit();
        },
        error: (err) => alert('Falha ao entrar: Verifique suas credenciais.'),
      });
    }
  }

  register() {
    if (this.registerForm.valid) {
      const { firstName, lastName, email, password } =
        this.registerForm.getRawValue();

      this.authService
        .register(firstName!, lastName!, email!, password!)
        .subscribe({
          next: (res) => {
            this.toastService.success('Cadastro realizado! Agora você pode entrar.');
            this.toggleForm(); 
            this.registerForm.reset();
          },
          error: (err) => alert('Erro ao cadastrar usuário.'),
        });
    }
  }
}
