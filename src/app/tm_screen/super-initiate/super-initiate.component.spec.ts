import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperInitiateComponent } from './super-initiate.component';

describe('SuperInitiateComponent', () => {
  let component: SuperInitiateComponent;
  let fixture: ComponentFixture<SuperInitiateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperInitiateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperInitiateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
