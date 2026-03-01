import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectGenresComponent } from './multi-select-genres.component';

describe('MultiSelectGenresComponent', () => {
  let component: MultiSelectGenresComponent;
  let fixture: ComponentFixture<MultiSelectGenresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiSelectGenresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiSelectGenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
