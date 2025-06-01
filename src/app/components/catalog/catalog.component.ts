import { Component } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'app-catalog',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './catalog.component.html',
})
export class CatalogComponent {}