import { Component } from '@angular/core';
import { FlightListRpaComponent } from '../flight-list-rpa/flight-list-rpa.component';
import { FlightsListComponent } from '../flights-list/flights-list.component';

@Component({
  selector: 'pm-flight-show',
  standalone: true,
  imports: [FlightsListComponent,FlightListRpaComponent],
  templateUrl: './flight-show.component.html',
  styleUrls: ['./flight-show.component.css']
})
export class FlightShowComponent {

}
