import { Component, inject, Signal, signal } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgIf } from "@angular/common";
import { MatIconModule } from "@angular/material/icon"
import { AuthService } from "../../services/auth.service";
import { UserMenuComponent } from "../user-menu/user-menu.component";
import { AuthModalComponent } from "../auth-modal/auth-modal.component"; 
import { MatMenuModule } from "@angular/material/menu";

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        RouterModule, 
        NgIf, 
        MatIconModule, 
        UserMenuComponent, 
        MatMenuModule,
        AuthModalComponent 
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
    private authService = inject(AuthService)
    user = this.authService.user;
    isLoggedIn = this.authService.isLoggedIn;

    isAuthModalOpen = signal(false);

    openLoginModal() {
        this.isAuthModalOpen.set(true);
    }

    closeLoginModal() {
        this.isAuthModalOpen.set(false);
    }
}