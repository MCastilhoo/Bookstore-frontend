import { Component, ElementRef, HostListener, Input, OnInit, OnChanges, SimpleChanges, forwardRef } from '@angular/core';
import { Genre } from '../../interface/genres-interface';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-multi-select-genres',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './multi-select-genres.component.html',
  styleUrl: './multi-select-genres.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectGenresComponent),
      multi: true
    }
  ]
})
export class MultiSelectGenresComponent implements ControlValueAccessor, OnInit, OnChanges {
  @Input() genres: Genre[] = [];
  @Input() placeholder: string = 'Selecione o(s) gênero(s)';

  public filteredOptions: Genre[] = [];
  public selecteds: Genre[] = [];
  public openedDropdown: boolean = false;

  public searchText: string = ''; 
  public disabled: boolean = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(private _elementRef: ElementRef) {}

  ngOnInit() {
    this.filteredOptions = this.genres;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['genres']) {
      this.filteredOptions = this.genres;
    }
  }

  toggleDropdown() {
    if (this.disabled) return;
    this.openedDropdown = !this.openedDropdown;
    if (this.openedDropdown) {
      this.filteredOptions = this.genres.filter(
        (option) => !this.isAlreadySelected(option)
      );
    } else {
      this.onTouched();
    }
  }

  selectOption(item: Genre) {
    this.selecteds.push(item);
    this.searchText = '';
    this.openedDropdown = false;
    this.updateForm();
  }

  removeOption(event: Event, item: Genre) {
    event.stopPropagation();
    this.selecteds = this.selecteds.filter((s) => s.genre !== item.genre);
    this.updateForm();
  }

  search(event: any) {
    const term = event.target.value.toLowerCase(); 
    this.searchText = term;
    
    if (!this.openedDropdown) this.openedDropdown = true;
    
    this.filteredOptions = this.genres.filter(
      (option) =>
        option.genre.toLowerCase().includes(term) && !this.isAlreadySelected(option)
    );
  }

  private isAlreadySelected(item: Genre): boolean {
    return this.selecteds.some((s) => s.genre === item.genre);
  }

  private updateForm() {
    this.onChange(this.selecteds);
  }

  writeValue(obj: any): void {
    if (obj) {
      this.selecteds = obj;
    } else {
      this.selecteds = [];
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this._elementRef.nativeElement.contains(event.target)) {
      this.openedDropdown = false;
      this.onTouched();
    }
  }
}