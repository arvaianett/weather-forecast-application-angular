import { Component, OnInit, Input } from '@angular/core';
import { OpenWeatherMapApiService } from '../../services/open-weather-map-api.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {
  @Input('city') city: string;
  public lineChartData: LineChartData[];

  constructor(private weatherApiService: OpenWeatherMapApiService) { }

  ngOnInit() {
    this.getWeatherForecast();
  }

  private getWeatherForecast(): void {
    this.weatherApiService.getWeatherForecast(this.city).subscribe(
      response => this.convertDataForLineChart(response),
      error => console.error(error)
    );
  }

  private convertDataForLineChart(forecastData): void {
    this.lineChartData = [{name: this.city, series: []}];
    forecastData.list.forEach(element => {
      const singleSeriesData: LineChartSeries = {
        name: element.dt_txt,
        value: element.main.temp
      };
      this.lineChartData[0].series.push(singleSeriesData);
    });
  }
}

interface LineChartData {
  name: string;
  series: LineChartSeries[];
}

interface LineChartSeries {
  name: string;
  value: number;
}
