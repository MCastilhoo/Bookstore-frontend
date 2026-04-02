import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book-service';
import { Book } from '../../interface/book-interface';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { Observable, switchMap, tap } from 'rxjs';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-book-details',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private bookService = inject(BookService);

  book$!: Observable<Book>;
  isFavorite: boolean = false;
  heartRegular = farHeart;
  heartSolid = fasHeart;

  ngOnInit(): void {
    this.book$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const slug = params.get('slug');
        if (!slug) {
          throw new Error('Invalid book slug');
        }
        console.log();
        return this.bookService.getBookBySlug(slug);
      }),
      tap((book: any) => {
        this.isFavorite = book.isFavorited;
      })
    );
  }
  
  toggleFavorite(slug: string) {
    if (this.isFavorite) {
      this.bookService.unfavoriteBook(slug).subscribe({
        next: () => {
          this.isFavorite = false;
        },
        error: (err) => console.error(err),
      });
    } else {
      this.bookService.favoriteBook(slug).subscribe({
        next: () => {
          this.isFavorite = true;
        },
        error: (err) => console.error(err),
      });
    }
  }
}
