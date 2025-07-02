import { AdminGuard } from './guard/admin.guard';
import { bootstrapApplication } from '@angular/platform-browser';
import { HomeComponent } from './components/home/home.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateBookComponent } from './components/create-book/create-book.component';
import { EmailConfirmationComponent } from './components/email-confirmation/email-confirmation.component';

export const routes = [
  { path: '', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component:  RegisterComponent},
  { path: 'create-book', component: CreateBookComponent, canActivate:[AdminGuard] },
  { path: 'email-confirmation', component: EmailConfirmationComponent }

];
