import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOfUserComponent } from './home-of-user.component';

describe('HomeOfUserComponent', () => {
  let component: HomeOfUserComponent;
  let fixture: ComponentFixture<HomeOfUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeOfUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeOfUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
