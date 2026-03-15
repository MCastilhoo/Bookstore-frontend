import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
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
  private route = inject(ActivatedRoute);

  books: Book[] = [];
  isLoadingBooks: boolean = true;
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const searchTerm = params['q'];
      if (searchTerm) {
        this.searchBooks(searchTerm);
      } else {
        this.loadBooks();
      }
    });
  }
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

  searchBooks(term: string) {
    this.isLoadingBooks = true;
    this.bookService.searchBook(term).subscribe({
      next: (booksFromDb) => {
        this.books = booksFromDb;
        this.isLoadingBooks = false;
      },
      error: (err) => {
        console.error('Erro na busca: ', err);
        this.books = [];
        this.isLoadingBooks = false;
      },
    });
  }
}
