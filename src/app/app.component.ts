import {Component, OnInit} from '@angular/core';
import {Http, Response} from '@angular/http';
import { WeatherService } from './weather-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WeatherService]
})
export class AppComponent implements OnInit{
  res: any;
  weatherResults: any;
  public stationLocations: any;
  giphies: any = [];
  title = 'Welcome to GiphySearch';
  link = 'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=';

  http: Http;

  constructor(http: Http, public _weatherService:WeatherService) {
    this.http = http;
  }

  performSearch(searchTerm: HTMLInputElement): void {
    var apiLink = this.link + searchTerm.value;
    this.http.request(apiLink)
      .subscribe((res: Response) => {
      console.log(res);
      this.giphies = res.json().data;
      console.log(this.giphies)
    });
  }
  public returnWeather() {
    let weather: any = [];
    console.log('get weather');
    weather = this._weatherService.getWeather();
    weather.subscribe(
      data => {this.weatherResults = data;
        console.log('not filtered')},
    )
  }
  public getStationsLocations() {
    let stationList:any = [];
      stationList =  this._weatherService.getStationLocations();  //store the return from the service
    console.log(stationList)

    stationList.subscribe(
     data => {this.stationLocations = data;
     console.log('not filtered')},
     // the second argument is a function which runs on error
     err => console.error(err)
     // the third argument is a function which runs on completion
     //() => console.log('locations:', this.stationLocations)
     );

     console.log('station locations is ', this.stationLocations);
  }




  ngOnInit(){
    this.returnWeather();
    this.getStationsLocations()
}

}
