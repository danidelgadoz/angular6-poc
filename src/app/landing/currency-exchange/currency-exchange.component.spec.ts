import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyExchangeComponent } from './currency-exchange.component';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CurrencyExchangeService } from './currency-exchange.service';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('CurrencyExchangeComponent', () => {
  let component: CurrencyExchangeComponent;
  let fixture: ComponentFixture<CurrencyExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyExchangeComponent ],
      imports: [ReactiveFormsModule, HttpClientModule],
      providers: [CurrencyExchangeService],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('The form must have a dollar and euro fields', () => {
    // TODO : Revisar valores en campos deshabilitados
    expect(component.exchangeForm.contains('dollarInput')).toBeTruthy();
    expect(component.exchangeForm.contains('euroInput')).toBeFalsy();
  });

  it('The dollar field must be mandatory', () => {
    const control = component.exchangeForm.get('dollarInput');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('The dollar field must have a valid number', () => {
    const control = component.exchangeForm.get('dollarInput');
    control.setValue('345.6789');
    expect(control.valid).toBeTruthy();
  });

  it('The dollar field must not allow more than 4 decimals', () => {
    const control = component.exchangeForm.get('dollarInput');
    control.setValue('345.678943434');
    expect(control.valid).toBeFalsy();
  });
});
