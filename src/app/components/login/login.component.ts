import { Component } from "@angular/core";
import { RouterModule, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [RouterModule, FormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    userEmail = '';
    password = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    login() {
        this.authService.login(this.userEmail, this.password).subscribe({
            next: (user) => {
                if (user) {
                    console.log('Login realizado:', user);
                    this.router.navigate(['/']);
                } else {
                    alert('Falha ao obter perfil do usuário após login.');
                }
            },
            error: () => {
                alert('E-mail ou senha inválidos');
            }
        });
    }

}
