import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FlightsService } from '../flights.service';
import { EMPTY, catchError } from 'rxjs';
import { Flights } from '../flights';
import { TimeFormatPipe } from 'src/app/utilities/time-format.pipe';

@Component({
  selector: 'pm-flights-list',
  standalone: true,
  imports: [TimeFormatPipe,AsyncPipe,NgIf, NgFor, NgClass],
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.css']
})
export class FlightsListComponent implements OnInit{
  private flightsService = inject(FlightsService);
  errorMessage:string = '';
  groupedData: { person: string;  duration: number; count: number }[] = [];
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
    const groupedMap = new Map<string, { person: string;  duration: number; count: number }>();
    data.forEach(obj => {
      const key = JSON.stringify({ person: obj.pilot, duration: obj.duration });
      if (groupedMap.has(key)) {
        const value = groupedMap.get(key);
        if (value) {
          value.count++;
        }
        
      } else {
        groupedMap.set(key, { person: obj.pilot, duration: obj.duration, count: 1 });
      }
    });

    this.groupedData = Array.from(groupedMap.values());
  }
}
