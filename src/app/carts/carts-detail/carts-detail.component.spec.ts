import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartsDetailComponent } from './carts-detail.component';

describe('CartsDetailComponent', () => {
  let component: CartsDetailComponent;
  let fixture: ComponentFixture<CartsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartsDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
