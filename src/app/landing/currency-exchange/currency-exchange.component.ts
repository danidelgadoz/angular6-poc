import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CurrencyExchangeService } from './currency-exchange.service';

@Component({
  selector: 'app-currency-exchange',
  templateUrl: './currency-exchange.component.html',
  styleUrls: ['./currency-exchange.component.scss']
})
export class CurrencyExchangeComponent implements OnInit {
  exchangeForm: FormGroup;
  amountConvert: string;

  constructor(public fb: FormBuilder, private currencyExchangeService: CurrencyExchangeService) { }

  ngOnInit() {
    this.setValuesFormBuilder();
  }

  private setValuesFormBuilder() {
    this.exchangeForm = new FormGroup({
      dollarInput: new FormControl({ value: '', disabled: false }, Validators.compose([
        Validators.required,
        Validators.pattern(/^\d+\.?\d{0,4}$/)
      ])),
      euroInput: new FormControl({ value: '', disabled: true })
    });
  }

  onCalculate(): void {
    const amountToExchange = Number(this.exchangeForm.get('dollarInput').value);

    this.currencyExchangeService
      .getEuroEquivalent(amountToExchange)
      .subscribe(
        (amount: number) => {
          this.exchangeForm.patchValue({ euroInput: String(amount) });
        },
        error => {},
        () => {});
  }

}
