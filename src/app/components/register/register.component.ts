import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { User } from "../../interface/user-interface";

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [RouterModule, FormsModule, CommonModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
    firstName = '';
    lastName = '';
    userEmail = '';
    password = '';
    apiError: string | null = null;

    constructor(private authService: AuthService, private router: Router) { }

    register() {
        this.apiError = null;
        if (!this.firstName || !this.lastName || !this.userEmail || !this.password) {
            return;
        }

        this.authService
            .register(this.firstName, this.lastName, this.userEmail, this.password)
            .subscribe({
                next: (user: User) => {
                    this.authService.userSignal.set(user);
                    localStorage.setItem('user', JSON.stringify(user)); 
                    this.router.navigate(['/email-confirmation']);
                },
                error: (err) => {
                    if (err.status === 409) {
                        this.apiError = "Este e-mail já foi cadastrado. Por favor use outro ou faça o login.";
                    } else {
                        this.apiError = "Erro ao registrar. Tente novamente mais tarde.";
                    }
                }
            });
    }
}
