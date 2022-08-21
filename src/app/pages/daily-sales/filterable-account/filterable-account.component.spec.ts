import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterableAccountComponent } from './filterable-account.component';

describe('FilterableAccountComponent', () => {
  let component: FilterableAccountComponent;
  let fixture: ComponentFixture<FilterableAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterableAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterableAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
