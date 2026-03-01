import { AdminGuard } from './guard/admin.guard';
import { bootstrapApplication } from '@angular/platform-browser';
import { HomeComponent } from './pages/home/home.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { provideRouter } from '@angular/router';
import { EmailConfirmationComponent } from './pages/email-confirmation/email-confirmation.component';

export const routes = [
  { path: '', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'email-confirmation', component: EmailConfirmationComponent }

];
