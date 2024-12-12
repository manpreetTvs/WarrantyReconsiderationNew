import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperPendingApprovalComponent } from './super-pending-approval.component';

describe('SuperPendingApprovalComponent', () => {
  let component: SuperPendingApprovalComponent;
  let fixture: ComponentFixture<SuperPendingApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperPendingApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperPendingApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
