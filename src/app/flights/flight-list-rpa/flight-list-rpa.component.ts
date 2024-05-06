import { Component, inject } from '@angular/core';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { EMPTY, catchError } from 'rxjs';
import { Flights } from '../flights';
import { FlightsService } from '../flights.service';
import { TimeFormatPipe } from 'src/app/utilities/time-format.pipe';

@Component({
  selector: 'pm-flight-list-rpa',
  standalone: true,
  imports: [TimeFormatPipe,AsyncPipe,NgIf, NgFor, NgClass],
  templateUrl: './flight-list-rpa.component.html',
  styleUrls: ['./flight-list-rpa.component.css']
})
export class FlightListRpaComponent {
  private flightsService = inject(FlightsService);
  errorMessage:string = '';
  groupedData: {person: string; rpa: string; duration: number; count: number }[] = [];
  readonly selectedValues$ = this.flightsService.selectedValues$
  .pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY
    })
  )
  ngOnInit(): void {
    this.flightsService.selectedValues$.pipe(
  
    ).subscribe( x => this.groupData(x))
  }
  groupData(data:Flights[]) {
    const groupedMap = new Map<string, { person: string; rpa: string; duration: number; count: number }>();
    data.forEach(obj => {
      const key = JSON.stringify({person: obj.pilot, rpa: obj.RPA, duration: obj.duration });
      if (groupedMap.has(key)) {
        const value = groupedMap.get(key);
        if (value) {
          value.count++;
        }
        
      } else {
        groupedMap.set(key, {person: obj.pilot, rpa: obj.RPA, duration: obj.duration, count: 1 });
      }
    });

    this.groupedData = Array.from(groupedMap.values());
  }
}
