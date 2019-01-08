import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherMapApiService {
  private currentWeatherURL: string;
  private weatherForecastURL: string;
  private APIKey: string;
  private unitFormat: string;

  constructor(private http: HttpClient) {
    this.APIKey = '141d49423aa277f66c124c24f1a3c81b';
    this.unitFormat = 'metric';
    this.currentWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
    this.weatherForecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=';
  }

  public getCurrentWeather(param: string): Observable<Object> {
    return this.http.get(this.currentWeatherURL + param + '&appid=' + this.APIKey + '&units=' + this.unitFormat);
  }

  public getWeatherForecast(param: string): Observable<Object> {
    return this.http.get(this.weatherForecastURL + param + '&appid=' + this.APIKey + '&units=' + this.unitFormat);
  }
}
