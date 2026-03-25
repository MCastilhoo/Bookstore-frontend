import { Component, inject, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book-service';
import { Book } from '../../interface/book-interface';
import { CommonModule } from '@angular/common';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-book-details',
  imports: [CommonModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit{

  private route = inject(ActivatedRoute)
  private bookService = inject(BookService)

  book$!: Observable<Book>;

  ngOnInit(): void {
    this.book$ = this.route.paramMap.pipe(
      switchMap(params => {
        const slug = params.get('slug');
        if (!slug) {
          throw new Error('deu merda aqui ó')
        }
        console.log()
        return this.bookService.getBookBySlug(slug)
      })
    )
  }
}
