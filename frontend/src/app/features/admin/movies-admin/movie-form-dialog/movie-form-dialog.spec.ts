import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieFormDialog } from './movie-form-dialog';

describe('MovieFormDialog', () => {
  let component: MovieFormDialog;
  let fixture: ComponentFixture<MovieFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieFormDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieFormDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
