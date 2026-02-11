import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BookService } from '../../services/book-service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-register-book-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-book-modal.component.html',
  styleUrl: './register-book-modal.component.css',
})
export class RegisterBookModalComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<RegisterBookModalComponent>);
  private bookService = inject(BookService);
  private toastService = inject(ToastrService);

  bookForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    author: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0.01)]],
    description:['', [Validators.required, Validators.minLength(10)]],
    pageNumbers: [0, [Validators.required, Validators.min(1)]],
    quantity: [0, [Validators.required, Validators.min(1)]],
    bookCover: [null, [Validators.required]],
  });

  coverPreview: string | null = null;
  bookCoverFile: File | null = null;

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
      const formData = {...this.bookForm.value};
      if (typeof formData.price === 'string') {
        formData.price = parseFloat(formData.price.replace(',', '.'));
      }
      this.bookService.registerBook(formData, this.bookCoverFile!).subscribe({
        next: (bookSaved) => {
          this.toastService.success('Livro registrado com sucesso!');
          this.dialogRef.close(bookSaved);
        },
        error: (err) => {
          console.error('Erro ao registrar livro:', err);
        }
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
