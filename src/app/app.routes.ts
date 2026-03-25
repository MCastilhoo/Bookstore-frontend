import { AdminGuard } from './guard/admin.guard';
import { bootstrapApplication } from '@angular/platform-browser';
import { HomeComponent } from './pages/home/home.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { provideRouter } from '@angular/router';
import { EmailConfirmationComponent } from './pages/email-confirmation/email-confirmation.component';
import { BookDetailsComponent } from './pages/book-details/book-details.component';

export const routes = [
  { path: '', component: HomeComponent },
  {
    path: 'catalogo',
    children: [
      {
        path: '',
        component: CatalogComponent, // Abre em: localhost/catalogo
      },
      {
        path: 'search',
        component: CatalogComponent, // Abre em: localhost/catalogo/search
      },
      {
        path: 'livro/:slug',
        component: BookDetailsComponent, // Abre em: localhost/catalogo/livro/nome-do-livro
      },
    ],
  },
  { path: 'email-confirmation', component: EmailConfirmationComponent },
];
