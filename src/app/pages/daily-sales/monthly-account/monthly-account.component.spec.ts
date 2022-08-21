import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyAccountComponent } from './monthly-account.component';

describe('MonthlyAccountComponent', () => {
  let component: MonthlyAccountComponent;
  let fixture: ComponentFixture<MonthlyAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
