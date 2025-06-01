import { Component } from "@angular/core";
import { BannerComponent } from "../banner/banner.component";
import { RouterModule } from "@angular/router";


@Component({
    selector: 'app-home',
    standalone: true,
    imports: [BannerComponent, RouterModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {}