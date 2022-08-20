import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyAccountComponent } from './daily-account.component';

describe('DailyAccountComponent', () => {
  let component: DailyAccountComponent;
  let fixture: ComponentFixture<DailyAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
