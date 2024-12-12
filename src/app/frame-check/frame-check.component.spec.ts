import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameCheckComponent } from './frame-check.component';

describe('FrameCheckComponent', () => {
  let component: FrameCheckComponent;
  let fixture: ComponentFixture<FrameCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
