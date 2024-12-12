import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoComponent } from './ho.component';

describe('HoComponent', () => {
  let component: HoComponent;
  let fixture: ComponentFixture<HoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
