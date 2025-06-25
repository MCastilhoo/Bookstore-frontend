import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

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
                next: () => {
                    const newUser ={
                        firstName: this.firstName,
                        lastName: this.lastName,
                        userEmail: this.userEmail
                    };

                    this.authService.userSignal.set(newUser);
                    localStorage.setItem('user', JSON.stringify(newUser))
                    this.router.navigate(['/login']);
                },
                error: (err) => {
                    if (err.status === 409) {
                        this.apiError = "Este e-mail já foi cadastrado. Por favor use outro ou faça o login."
                    }
                }
            });
    }

}