import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Passenger } from './models/passengers.interface';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';

const PASSENGER_API: string = 'http://localhost:3000/passengers';
// const PASSENGER_API : string = '../../../db.json'
@Injectable()

export class PassengerDashboardService {
  constructor(private http: HttpClient) {
  }

  getPassengers(): Observable<Passenger[]> {
    return this.http
    .get(PASSENGER_API)
    .map((response: any) => response);
  }
  //  getPassengers(): Observable<Passenger[]> {
  //   return this.http
  //   .get(PASSENGER_API)
  //   .map((response: HttpResponse<null>) => HttpResponse());
  // }
}
