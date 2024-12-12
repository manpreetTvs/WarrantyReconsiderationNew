import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperReportComponent } from './super-report.component';



describe('SuperReportComponent', () => {
  let component: SuperReportComponent;
  let fixture: ComponentFixture<SuperReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
