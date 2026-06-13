import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresAdmin } from './genres-admin';

describe('GenresAdmin', () => {
  let component: GenresAdmin;
  let fixture: ComponentFixture<GenresAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenresAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(GenresAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
