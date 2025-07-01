import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenreService } from '../services/genre.service';
import { Genre } from '../interface/genres-interface';

@Component({
  selector: 'app-create-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-book.component.html',
  styleUrl: './create-book.component.css'
})
export class CreateBookComponent implements OnInit{
  bookForm: FormGroup;
  selectedImage: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  selectedFileName: string | null = null

  genres: Genre[] = []

  constructor(private fb: FormBuilder, private genreService: GenreService) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required],
      pages: [null, [Validators.required, Validators.min(1)]],
      price: [null, [Validators.required, Validators.min(0)]],
      quantity: [null, [Validators.required, Validators.min(1)]],
      genre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
      this.loadGenres()
  }

  loadGenres() {
    this.genreService.getGenres().subscribe({
      next: (data) => {
        this.genres = data;
      },
      error: (err) => {
        console.error('Erro ao carregar gêneros:', err);
      }
    });
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0]
      this.selectedFileName = this.selectedImage.name

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result
      };
      reader.readAsDataURL(this.selectedImage)
    }
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const bookData = {
        ...this.bookForm.value,
        capa: this.selectedImage
      };
      console.log('Dados do livro:', bookData)
    } else {
      console.log('Invalid Form')
    }
  }
}
