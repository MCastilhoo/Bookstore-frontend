import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register-book-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-book-modal.component.html',
  styleUrl: './register-book-modal.component.css',
})
export class RegisterBookModalComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<RegisterBookModalComponent>);

  bookForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    author: ['', [Validators.required, Validators.minLength(3)]],
    bookCover: [null],
  });

  coverPreview: string | null = null;

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione um arquivo de imagem válido.');
      return;
    }

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
      console.log('Dados do livro:', this.bookForm.value);
      this.dialogRef.close(this.bookForm.value);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
