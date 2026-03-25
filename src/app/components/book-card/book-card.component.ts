import { Component, Input } from '@angular/core';
import { Book } from '../../interface/book-interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-book-card',
  imports: [RouterLink],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent {
  @Input() book!: Book;
}
