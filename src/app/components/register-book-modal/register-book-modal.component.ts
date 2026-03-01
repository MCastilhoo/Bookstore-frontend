import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BookService } from '../../services/book-service';
import { GenreService } from '../../services/genre.service';
import { ToastrService } from 'ngx-toastr';
import { Book } from '../../interface/book-interface';
import { Genre } from '../../interface/genres-interface';
import { MultiSelectGenresComponent } from '../multi-select-genres/multi-select-genres.component';

@Component({
  selector: 'app-register-book-modal',
  imports: [CommonModule, ReactiveFormsModule, MultiSelectGenresComponent],
  templateUrl: './register-book-modal.component.html',
  styleUrl: './register-book-modal.component.css',
})
export class RegisterBookModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<RegisterBookModalComponent>);
  private bookService = inject(BookService);
  private toastService = inject(ToastrService);
  private genreService = inject(GenreService);

  availableGenres: Genre[] = [];
  isLoadingGenres: boolean = true;
  bookForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    author: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0.01)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    pageNumbers: [0, [Validators.required, Validators.min(1)]],
    quantity: [0, [Validators.required, Validators.min(1)]],
    bookGenre: [[], [Validators.required]],
    bookCover: [null, [Validators.required]],
  });

  coverPreview: string | null = null;
  bookCoverFile: File | null = null;

  ngOnInit(): void {
    this.loadGenres();
  }

  loadGenres() {
    this.isLoadingGenres = true;
    this.genreService.getGenres().subscribe({
      next: (genresFromDb) => {
        this.availableGenres = genresFromDb; 
        this.isLoadingGenres = false;
      },
      error: (err) => {
        console.error('Erro ao buscar gêneros', err);
        this.toastService.error('Erro ao carregar lista de gêneros.');
        this.isLoadingGenres = false;
      }
    }); 
  }
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione um arquivo de imagem válido.');
      return;
    }
    this.bookCoverFile = file;
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result as string;
      this.coverPreview = base64;

      this.bookForm.patchValue({ bookCover: base64 });
    };

    reader.readAsDataURL(file);
  }

  save(): void {
    if (this.bookForm.valid) {
      const rawData = this.bookForm.getRawValue();

      let price = rawData.price;
      if (typeof price === 'string') {
        price = parseFloat(price.replace(',', '.'));
      }
      const genreIds = rawData.bookGenre.map((g: Genre) => g.genreId)

      const bookData: Book = {
        ...rawData,
        price: price,
        genreIds: genreIds
      };
      this.bookService.registerBook(bookData, this.bookCoverFile!).subscribe({
        next: (bookSaved) => {
          this.toastService.success('Livro registrado com sucesso!');
          this.dialogRef.close(bookSaved);
        },
        error: (err) => {
          console.error('Erro ao registrar livro:', err);
          this.toastService.error(
            'Erro ao registrar livro. Por favor, tente novamente.',
          );
        },
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
