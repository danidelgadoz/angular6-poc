import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './landing.component';
import { CurrencyExchangeComponent } from './currency-exchange/currency-exchange.component';
import { HomeComponent } from './home/home.component';
import { InsightsComponent } from './insights/insights.component';
import { AboutUsComponent } from './about-us/about-us.component';

const LandingRoutes: Routes = [
    {
        path: '',
        component: LandingComponent,
        children: [
            {
                path: '',
                redirectTo: 'currency-exchange',
                pathMatch: 'full'
            },
            {
                path: 'currency-exchange',
                component: CurrencyExchangeComponent,
            },
            {
                path: 'home',
                component: HomeComponent,
            },
            {
                path: 'insights',
                component: InsightsComponent,
            },
            {
                path: 'about-us',
                component: AboutUsComponent,
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(LandingRoutes) ],
    exports: [ RouterModule ]
})
export class LandingRoutingModule {}
