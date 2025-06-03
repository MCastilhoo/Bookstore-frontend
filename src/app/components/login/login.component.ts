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
            next: (res) => {
                console.log('Login realizado:', res);
                localStorage.setItem('token', res.token);
                localStorage.setItem('user', JSON.stringify(res.user));
                this.router.navigate(['/']);
            },
            error: (err) => {
                alert('E-mail ou senha inválidos');
            }
        });
    }
}