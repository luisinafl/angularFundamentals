import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PassengerDashboardModule } from './passenger-dashboard/passenger-dashboard.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    //custom modules,
    HttpClientModule,
    PassengerDashboardModule
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
