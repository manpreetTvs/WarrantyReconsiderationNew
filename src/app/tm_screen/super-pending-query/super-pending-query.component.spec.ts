import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperPendingQueryComponent } from './super-pending-query.component';

describe('SuperPendingQueryComponent', () => {
  let component: SuperPendingQueryComponent;
  let fixture: ComponentFixture<SuperPendingQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperPendingQueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperPendingQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
