import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreFormDialog } from './genre-form-dialog';

describe('GenreFormDialog', () => {
  let component: GenreFormDialog;
  let fixture: ComponentFixture<GenreFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreFormDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(GenreFormDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
