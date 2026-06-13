import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkShowingDialog } from './bulk-showing-dialog';

describe('BulkShowingDialog', () => {
  let component: BulkShowingDialog;
  let fixture: ComponentFixture<BulkShowingDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulkShowingDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(BulkShowingDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
