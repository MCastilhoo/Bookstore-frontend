import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegisterBookModalComponent } from '../../components/register-book-modal/register-book-modal.component';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { Book } from '../../interface/book-interface';
import { BookService } from '../../services/book-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterModule, BookCardComponent, CommonModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  private bookService = inject(BookService);
  private dialog = inject(MatDialog);

  books: Book[] = [];
  isLoadingBooks: boolean = true;
  ngOnInit() {
    this.loadBooks();
  };
  openRegisterBookModal() {
    const dialogRef = this.dialog.open(RegisterBookModalComponent, {
      width: '800px',
      autoFocus: 'input',
      panelClass: 'livros-letras-modal',
    });
    dialogRef.afterClosed();
  }

  loadBooks() {
    this.isLoadingBooks = true;
    this.bookService.getAllBooks().subscribe({
      next: (booksFromDb) => {
        this.books = booksFromDb;
        this.isLoadingBooks = false;
      },
      error: (err) => {
        console.error('Erro ao buscar os livros: ', err);
      },
    });
  }
}
