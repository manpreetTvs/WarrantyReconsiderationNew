import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmsMenuComponent } from './dms-menu.component';

describe('DmsMenuComponent', () => {
  let component: DmsMenuComponent;
  let fixture: ComponentFixture<DmsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmsMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
