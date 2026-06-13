import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesAdmin } from './movies-admin';

describe('MoviesAdmin', () => {
  let component: MoviesAdmin;
  let fixture: ComponentFixture<MoviesAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
