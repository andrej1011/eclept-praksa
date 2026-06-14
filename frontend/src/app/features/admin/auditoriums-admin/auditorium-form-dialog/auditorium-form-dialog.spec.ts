import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriumFormDialog } from './auditorium-form-dialog';

describe('AuditoriumFormDialog', () => {
  let component: AuditoriumFormDialog;
  let fixture: ComponentFixture<AuditoriumFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditoriumFormDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(AuditoriumFormDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
