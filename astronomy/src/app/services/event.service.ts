import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AstronomyEvent } from '../model/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {


  constructor(private httpClient: HttpClient) { }

  host = "http://localhost:3000/";

  getEvents(query: string): Observable<AstronomyEvent[]> {
    return this.httpClient.get<AstronomyEvent[]>(this.host + "api/events", {
      params: { q: query }
    })
  }
  getEvent(name:string): Observable<AstronomyEvent> {
    return this.httpClient.get<AstronomyEvent>(this.host + 'api/events/' + name);
  }

  changeRating(id: number, changeAmount: number): Observable<any> {
    return this.httpClient.patch(this.host + "api/events/" + id, {
      changeInQuantity: changeAmount
    })
  }

  deleteEvent(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.host + "api/events/" + id)
  }


  addEvent(event: AstronomyEvent): Observable<AstronomyEvent> {
    return this.httpClient.post<AstronomyEvent>(this.host + "api/events", event)
  }


}
