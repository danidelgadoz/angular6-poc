import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { LandingRoutingModule } from './landing.route';
import { LandingComponent } from './landing.component';
import { HeaderComponent, FooterComponent, MenuComponent } from './layouts';

import { HomeComponent } from './home/home.component';
import { InsightsComponent } from './insights/insights.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CurrencyExchangeComponent } from './currency-exchange/currency-exchange.component';
import { CurrencyExchangeService } from './currency-exchange/currency-exchange.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LandingRoutingModule
  ],
  declarations: [
    LandingComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    HomeComponent,
    InsightsComponent,
    AboutUsComponent,
    CurrencyExchangeComponent
  ],
  providers: [CurrencyExchangeService]
})
export class LandingModule { }
