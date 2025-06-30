import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-book.component.html',
  styleUrl: './create-book.component.css'
})
export class CreateBookComponent {
  bookForm: FormGroup;
  selectedImage: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  selectedFileName: string | null = null

  constructor(private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      descricao: ['', Validators.required]
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
    if (this.bookForm.valid){
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
