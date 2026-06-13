import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriumsAdmin } from './auditoriums-admin';

describe('AuditoriumsAdmin', () => {
  let component: AuditoriumsAdmin;
  let fixture: ComponentFixture<AuditoriumsAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditoriumsAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(AuditoriumsAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
