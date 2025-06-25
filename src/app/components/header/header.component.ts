import { Component, Signal, OnInit } from "@angular/core"; // <- Adicione OnInit
import { RouterModule } from "@angular/router";
import { NgIf } from "@angular/common";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterModule, NgIf],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
    user: any;
    isLoggedIn: Signal<boolean>;

    constructor(public authService: AuthService) {
        this.user = this.authService.user;
        this.isLoggedIn = this.authService.isLoggedIn;
    }

    ngOnInit(): void {
        console.log("Usuário no header:", this.user()); // <-- Aqui o console.log!
    }
}
