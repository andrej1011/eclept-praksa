import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowingFormDialog } from './showing-form-dialog';

describe('ShowingFormDialog', () => {
  let component: ShowingFormDialog;
  let fixture: ComponentFixture<ShowingFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowingFormDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowingFormDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
