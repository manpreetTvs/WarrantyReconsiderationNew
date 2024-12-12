import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproverReportComponent } from './approver-report.component';

describe('ApproverReportComponent', () => {
  let component: ApproverReportComponent;
  let fixture: ComponentFixture<ApproverReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproverReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproverReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
