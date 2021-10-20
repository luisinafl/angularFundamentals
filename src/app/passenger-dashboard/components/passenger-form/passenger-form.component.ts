import { Component, Input, Output } from '@angular/core';
import { Passenger } from '../../models/passengers.interface';
import { Baggage } from '../../models/bagagge.interface';
// import { EventEmitter } from 'stream';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'passenger-form',
  styleUrls: ['passenger-form.component.scss'],
  template: `
    <form
      #form="ngForm"
      novalidate
      (ngSubmit)="handleSubmit(form.value, form.valid)"
    >
      Form!
      {{ detail | json }}
      <div>
        Passenger id:
        <input
          type="number"
          name="id"
          [ngModel]="detail?.id"
          #id="ngModel"
          required
        />
        <div *ngIf="id.errors?.required && id.touched" class="error">
          ID is required
        </div>
      </div>
      <div>
        Passenger name:
        <input
          type="text"
          name="fullname"
          [ngModel]="detail?.fullname"
          #fullname="ngModel"
          required
        />

        <div
          *ngIf="fullname.errors?.required && fullname.touched"
          class="error"
        >
          Passenger name is required
        </div>
        <div>
          {{ fullname.errors | json }}
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="checkedIn"
              [ngModel]="detail?.checkedIn"
              (ngModelChange)="toggleCheckIn($event)"
            />
          </label>
        </div>
        <div *ngIf="form.value.checkedIn">
          Date:
          <input
            type="number"
            name="checkInDate"
            [ngModel]="detail?.checkInDate"
          />
        </div>
      </div>

      <div>
        Luggage:
        <select name="baggage" [ngModel]="detail?.baggage">
          <option
            *ngFor="let item of baggage"
            [value]="item.key"
            [selected]="item.key === detail?.baggage"
          >
            {{ item.value }}
          </option>
        </select>
        <select name="baggage" [ngModel]="detail?.baggage">
          <option *ngFor="let item of baggage" [ngValue]="item.key">
            {{ item.value }}
          </option>
        </select>
      </div>
      <button type="submit" [disabled]="form.invalid">Update</button>
    </form>
  `,
})
export class PassengerFormComponent {
  @Input()
  detail: Passenger;

  @Output()
  update: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  baggage: Baggage[] = [
    {
      key: 'none',
      value: 'No baggage',
    },
    {
      key: 'hand-only',
      value: 'Hand baggage',
    },
    {
      key: 'hold-only',
      value: 'Hold baggage',
    },
    {
      key: 'hand-hold',
      value: 'Hand and hold baggage',
    },
  ];

  toggleCheckIn(checkedIn: boolean) {
    if (checkedIn) {
      this.detail.checkInDate = Date.now();
    }
  }

  handleSubmit(passenger: Passenger, isValid: boolean) {
    if (isValid) {
      this.update.emit(passenger);
    }
  }
}
