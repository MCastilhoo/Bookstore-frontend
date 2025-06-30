import { Component, Signal, OnInit } from "@angular/core"; // <- Adicione OnInit
import { RouterModule } from "@angular/router";
import { NgIf } from "@angular/common";
import { MatIconModule } from "@angular/material/icon"
import { AuthService } from "../../services/auth.service";
import { UserMenuComponent } from "../user-menu/user-menu.component";
import { MatMenuModule } from "@angular/material/menu";

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterModule, NgIf, MatIconModule, UserMenuComponent, MatMenuModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
    user: any;
    isLoggedIn: Signal<boolean>;

    constructor(public authService: AuthService) {
        this.user = this.authService.user;
        this.isLoggedIn = this.authService.isLoggedIn;
    }
}
