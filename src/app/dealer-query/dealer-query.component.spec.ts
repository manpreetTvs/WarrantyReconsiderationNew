import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerQueryComponent } from './dealer-query.component';

describe('DealerQueryComponent', () => {
  let component: DealerQueryComponent;
  let fixture: ComponentFixture<DealerQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerQueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
