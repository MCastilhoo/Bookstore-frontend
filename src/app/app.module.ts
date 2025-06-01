import { bootstrapApplication } from '@angular/platform-browser';
import { HomeComponent } from './components/home/home.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { provideRouter } from '@angular/router';


bootstrapApplication(HomeComponent, {
  providers: [
    provideRouter([
      { path: '', component: HomeComponent },
      { path: 'catalog', component: CatalogComponent }
    ])
  ]
})
