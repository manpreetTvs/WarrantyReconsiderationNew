import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproverLoginComponent } from './approver-login.component';

describe('ApproverLoginComponent', () => {
  let component: ApproverLoginComponent;
  let fixture: ComponentFixture<ApproverLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproverLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproverLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
