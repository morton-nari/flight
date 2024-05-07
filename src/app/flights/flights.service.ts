import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PersonList } from '../flights/person';
import { BehaviorSubject, Observable, catchError, shareReplay, tap, throwError } from 'rxjs';
import { HttpErrorService } from '../utilities/http-error.service';
import { RpaList } from './rpa';
import { Flights } from './flights';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  private http = inject(HttpClient);
  private errorService = inject(HttpErrorService);
  private rpaUrl = 'api/rpaList';
  private personUrl = 'api/personList';
  private selectedValue: Flights[] = [];
  private selectedValuesSubject = new BehaviorSubject<Flights[]>(this.selectedValue);
  selectedValues$ = this.selectedValuesSubject.asObservable();

  readonly personList$ = this.http.get<PersonList[]>(this.personUrl)
  .pipe(
    shareReplay(1),
    catchError(err => this.handleError(err))
    );
 
  readonly rpaList$ = this.http.get<RpaList[]>(this.rpaUrl)
  .pipe(
    shareReplay(1),
    catchError(err => this.handleError(err))
    );

    updateSelectedValues(flights: Flights[]) {
      this.selectedValuesSubject.next(flights);
    }
    addNewFlight(person:string,rpa:string,  startMinCount: number, endMinCount: number){
      const newFlight = new Flights(person, rpa, startMinCount,endMinCount);
      this.selectedValuesSubject.next([...this.selectedValuesSubject.value, newFlight]);
    }

  private handleError(err: HttpErrorResponse): Observable<never>{
    const formatedErrorMessage =  this.errorService.formatError(err)
    return throwError(() => formatedErrorMessage);
  }
}
