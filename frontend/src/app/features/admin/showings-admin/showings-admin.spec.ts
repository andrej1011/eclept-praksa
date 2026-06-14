import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowingsAdmin } from './showings-admin';

describe('ShowingsAdmin', () => {
  let component: ShowingsAdmin;
  let fixture: ComponentFixture<ShowingsAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowingsAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowingsAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
