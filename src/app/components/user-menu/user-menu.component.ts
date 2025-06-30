import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatMenuModule } from "@angular/material/menu";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'app-user-menu',
    standalone: true,
    imports: [CommonModule, MatMenuModule],
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent{
    private authService = inject(AuthService);

    user = this.authService.user;
    isLoggedIn = this.authService.isLoggedIn;

    logout(){
        this.authService.logout();
    }
}