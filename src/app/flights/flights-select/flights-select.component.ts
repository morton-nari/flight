import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { AsyncPipe,NgClass, NgFor, NgIf } from '@angular/common';
import { FlightsService } from '../flights.service';
import { BehaviorSubject, EMPTY, Subject, catchError, combineLatest, map, tap, withLatestFrom } from 'rxjs';

import {  ReactiveFormsModule } from '@angular/forms';
import { TimeSelectionComponent } from '../time-selection/time-selection.component';

import { FlightShowComponent } from '../flight-show/flight-show.component';


@Component({
  selector: 'pm-flights-select',
  standalone: true,
  imports: [TimeSelectionComponent,ReactiveFormsModule ,AsyncPipe,NgIf, NgFor, NgClass, FlightShowComponent],
  templateUrl: './flights-select.component.html',
  styleUrls: ['./flights-select.component.css']
})
export class FlightsSelectComponent implements AfterViewInit {
  selectedPilot!: string;
  selectedRPA!: string;
  startTimeMinCount!: number;
  endTimeMinCount!: number;
  duration!: string;
  
  onStartTimeSelected(minCount: number) {
    this.startTimeMinCount = minCount;
  }
  onEndTimeSelected(minCount: number) {
    this.endTimeMinCount = minCount;
  }
  
  private flightsService = inject(FlightsService);
  errorMessage:string = '';
  @ViewChild('person') personRef!: ElementRef;
  @ViewChild('rpa') rpaRef!: ElementRef;

  personChange$ = new Subject<string>();
  rpaChange$ = new Subject<string>();

  addItem$ = new Subject<void>();  // Subject for the Add button

  selectedItems$ = new BehaviorSubject<string[]>([]);

  ngAfterViewInit() {
    const combinedSelections$ = combineLatest([
      this.personChange$,
      this.rpaChange$
    ]).pipe(
      map(([person, rpa]) => ({
          person: person,
          rpa: rpa
        })
      )
    );
this.addItem$
      .pipe(
        withLatestFrom(combinedSelections$), // Get latest value from dropdowns
        tap(([_,newValue]) => this.flightsService.addNewFlight(newValue.person,newValue.rpa,this.startTimeMinCount,this.endTimeMinCount)) 
      )
      .subscribe();
  }

readonly rpaList$ = this.flightsService.rpaList$
  .pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY
    })
  )
readonly personList$ = this.flightsService.personList$
  .pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY
    })
  )
  addFlight() {
    console.log('Selected time:', this.endTimeMinCount, this.startTimeMinCount);
      
  }

  onPersonChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.personChange$.next(value);
  }

  onRpaChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.rpaChange$.next(value);
  }

  // formatTime(time: number): string {
  //   return time < 10 ? `0${time}` : `${time}`;
  // }

  addItemToList() {
    this.addItem$.next();
  }
}

