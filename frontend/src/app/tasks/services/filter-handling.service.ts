import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class FilterHandlingService
{

  private filterSubject: BehaviorSubject<string> = new BehaviorSubject<string>('All');
  public filter$ = this.filterSubject.asObservable();

  setFilter(filter: string) {
    this.filterSubject.next(filter);
  }
}
