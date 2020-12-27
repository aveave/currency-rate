import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyRateChartComponent } from './currency-rate-chart.component';

describe('CurrencyRateChartComponent', () => {
  let component: CurrencyRateChartComponent;
  let fixture: ComponentFixture<CurrencyRateChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyRateChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyRateChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
