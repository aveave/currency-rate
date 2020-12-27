import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyRateTableComponent } from './currency-rate-table.component';

describe('CurrencyRateTableComponent', () => {
  let component: CurrencyRateTableComponent;
  let fixture: ComponentFixture<CurrencyRateTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyRateTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyRateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
