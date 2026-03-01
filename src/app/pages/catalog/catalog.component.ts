import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegisterBookModalComponent } from '../../components/register-book-modal/register-book-modal.component';
import { BookCardComponent } from '../../components/book-card/book-card.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterModule, BookCardComponent],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  private dialog = inject(MatDialog);

  openRegisterBookModal() {
    const dialogRef = this.dialog.open(RegisterBookModalComponent, {
      width: '800px',
      autoFocus: 'input',
      panelClass: 'livros-letras-modal',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Livro registrado:', result);
      }
    });
  }
}
