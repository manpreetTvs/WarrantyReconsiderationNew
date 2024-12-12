import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmsApprovalComponent } from './dms-approval.component';

describe('DmsApprovalComponent', () => {
  let component: DmsApprovalComponent;
  let fixture: ComponentFixture<DmsApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmsApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmsApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
