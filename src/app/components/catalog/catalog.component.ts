import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegisterBookModalComponent } from '../register-book-modal/register-book-modal.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './catalog.component.html',
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
