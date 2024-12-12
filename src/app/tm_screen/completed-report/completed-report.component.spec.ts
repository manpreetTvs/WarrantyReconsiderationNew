import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedReportComponent } from './completed-report.component';

describe('CompletedReportComponent', () => {
  let component: CompletedReportComponent;
  let fixture: ComponentFixture<CompletedReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
