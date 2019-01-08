import { Component, OnInit, Input } from '@angular/core';
import { OpenWeatherMapApiService } from '../../services/open-weather-map-api.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  @Input('city') city: string;
  public currentWeatherData;

  constructor(private weatherApiService: OpenWeatherMapApiService) { }

  ngOnInit() {
    this.getCurrentWeather();
  }

  private getCurrentWeather(): void {
    this.weatherApiService.getCurrentWeather(this.city).subscribe(
      response => this.showCurrentWeather(response),
      error => console.error(error)
    );
  }

  private showCurrentWeather(currentWeatherData): void {
    this.currentWeatherData = currentWeatherData;
  }
}
