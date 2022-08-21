import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyAccountComponent } from './weekly-account.component';

describe('WeeklyAccountComponent', () => {
  let component: WeeklyAccountComponent;
  let fixture: ComponentFixture<WeeklyAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
