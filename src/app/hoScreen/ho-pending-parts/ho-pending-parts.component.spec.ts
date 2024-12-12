import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoPendingPartsComponent } from './ho-pending-parts.component';

describe('HoPendingPartsComponent', () => {
  let component: HoPendingPartsComponent;
  let fixture: ComponentFixture<HoPendingPartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoPendingPartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoPendingPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
