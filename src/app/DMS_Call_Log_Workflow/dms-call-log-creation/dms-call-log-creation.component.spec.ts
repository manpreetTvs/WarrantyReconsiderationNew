import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DMSCallLogCreationComponent } from './dms-call-log-creation.component';

describe('DMSCallLogCreationComponent', () => {
  let component: DMSCallLogCreationComponent;
  let fixture: ComponentFixture<DMSCallLogCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DMSCallLogCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DMSCallLogCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
