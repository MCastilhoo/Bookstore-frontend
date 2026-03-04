import { Injectable } from '@angular/core';
import { Book } from '../interface/book-interface';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  registerBook(book: Book, bookCover: File): Observable<Book> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAccessToken()}`,
    })
    const formData = new FormData();
    const bookBlob = new Blob([JSON.stringify(book)], { type: 'application/json' });
    formData.append('book', bookBlob);
    formData.append('title', book.title);
    formData.append('author', book.author);
    formData.append('price', book.price.toString());
    formData.append('description', book.description);
    formData.append('pageNumbers', book.pageNumbers.toString())
    formData.append('quantity', book.quantity.toString())
    if (book.bookGenre && Array.isArray(book.bookGenre)) {
      book.bookGenre.forEach((g: any) => {
        const id = g.genreId ? g.genreId : g;
        formData.append('genreIds', id.toString());
      })
    }

    if (bookCover) {
      formData.append('bookCover', bookCover);
    }
    return this.http.post<Book>(`${this.apiUrl}/books`, formData, { headers });
  }

  getAllBooks():Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/books`)
  }
}
