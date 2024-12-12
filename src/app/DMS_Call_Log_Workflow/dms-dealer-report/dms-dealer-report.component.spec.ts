import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DMSDealerReportComponent } from './dms-dealer-report.component';

describe('DMSDealerReportComponent', () => {
  let component: DMSDealerReportComponent;
  let fixture: ComponentFixture<DMSDealerReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DMSDealerReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DMSDealerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
