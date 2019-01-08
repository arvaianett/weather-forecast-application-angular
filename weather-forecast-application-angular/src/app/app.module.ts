import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { LocalstorageService } from './services/localstorage.service';
import { OpenWeatherMapApiService } from './services/open-weather-map-api.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ModalComponent } from './components/modal/modal.component';
import { TabComponent } from './components/tab/tab.component';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    NgxChartsModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ModalComponent,
    TabComponent,
    CurrentWeatherComponent,
    WeatherForecastComponent
  ],
  providers: [
    LocalstorageService,
    OpenWeatherMapApiService
  ],
  entryComponents: [ModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
