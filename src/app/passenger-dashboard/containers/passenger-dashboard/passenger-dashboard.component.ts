import { Component, OnInit } from '@angular/core';

import { Passenger } from '../../models/passengers.interface';
import { PassengerDashboardModule } from '../../passenger-dashboard.module';
import { PassengerDashboardService } from '../../passenger-dashboard.service';

@Component({
  selector: 'passenger-dashboard',
  styleUrls: ['passenger-dashboard.component.scss'],
  template: `
    <div>
          <passenger-count [items]="passengers"> </passenger-count>
          <div *ngFor="let passenger of passengers">
            {{ passenger.fullname }}
          </div>
          <passenger-detail
            *ngFor="let passenger of passengers"
            [detail]="passenger"
            (edit)="handleEdit($event)"
            (remove)="handleRemove($event)"
          >
          </passenger-detail>

    </div>
  `,
})
export class PassengerDashboardComponent implements OnInit {
  passengers: any;

  constructor(private passengerService: PassengerDashboardService) {}

  ngOnInit() {
    // this.passengers = this.passengerService.getPassengers();
    this.passengerService.getPassengers().subscribe((data: Passenger[]) => {
      console.log('Data:', data);
      this.passengers = data;
    });
  }
  handleEdit(event: Passenger) {
    this.passengerService
      .updatePassengers(event)
      .subscribe((data: Passenger) => {
        this.passengers = this.passengers.map((passenger: Passenger) => {
          if (passenger.id === event.id) {
            passenger = Object.assign({}, passenger, event);
          }
          return passenger;
        });
      });
    console.log(this.passengers);
  }

  handleRemove(event: Passenger) {
    console.log(event);
    this.passengerService
      .removePassengers(event)
      .subscribe((data: Passenger) => {
        this.passengers = this.passengers.filter((passenger: Passenger) => {
          return passenger.id !== event.id;
        });
      });
  }
}
