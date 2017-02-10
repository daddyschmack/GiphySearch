import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class WeatherService{
  public fakeLocationsUrl: string = '/app/weatherData.json';  // until the online service is ready
  public stationLocationsUrl:string = '/app/stationDetail.json';
  public weatherUrl: string = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=Dallas,us&mode=json&units=imperial&cnt=7&APPID=f9dbd911bc01df1d9ce563b2ba4d3209';
  private wrappedHeaders = new Headers();
  constructor(private http: Http) {
    this.wrappedHeaders.append('X-Requested-With', 'XMLHttpRequest');
  }

  getWeather(): Observable <any> {
    // let headers = new Headers({'Content-Type': 'application/json'});
    // let options = new RequestOptions({headers: headers});
    // console.log('we are in the getStationLocation Service');

    return this.http.get(
      //this.providersUrl, {headers: this.wrappedHeaders})
      this.fakeLocationsUrl)
      .do(res=>console.log('full object',res))
      .map((res) => res.json());
    // .do(res=>console.log('full object',res))

  }

  getWeatherData() {

    // console.log('rateData ',rateData)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    return this.http.get(this.weatherUrl)
    .do(res => console.log('full object from getRates', res))
      .map((res: Response) => res.json())
      .flatMap(res => res.list)
    .do(res => console.log('res after flat map is', res));
  }

  getStationLocations(): Observable <any> {
    // let headers = new Headers({'Content-Type': 'application/json'});
    // let options = new RequestOptions({headers: headers});
    // console.log('we are in the getStationLocation Service');


    // return this.http.get('/app/stationDetail.json', options).map((res:Response) =>  res.json());

    // return this.http.get(this.locationServiceURL,{headers: this.wrappedHeaders}).map((res) => res.json().StationsDetailResponse.Stations);
    return this.http.get(
      //this.providersUrl, {headers: this.wrappedHeaders})
      this.stationLocationsUrl)
     .do(res=>console.log('full locations object',res))
      .map((res) => res.json());
    // .do(res=>console.log('full object',res))

  }

}

