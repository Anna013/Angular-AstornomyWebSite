import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/merge';

import { AstronomyEvent } from 'src/app/model/event';
import { EventService } from 'src/app/services/event.service';
import { EventRatingChange } from 'src/app/model/rating-change';




@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  public events$: Observable<AstronomyEvent[]>;
  public searchTerm: string = '';

  public on: boolean;
  public off: boolean;
  public id1: number;
  public start: boolean = true;

  private searchSubject: Subject<string> = new Subject();
  private reloadEventList: Subject<void> = new Subject();

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.events$ = this.searchSubject
      .startWith(this.searchTerm)
      .debounceTime(300)
      .distinctUntilChanged()
      .merge(this.reloadEventList)
      .switchMap((query) => this.eventService.getEvents(this.searchTerm));

    this.on = false;
    this.off = false;

  }

  search() {
    this.searchSubject.next(this.searchTerm);
  }

  isAdmin():boolean{
    if(localStorage.getItem('tokenAdmin'))
      return  true;
    return false;
  }
  isUser():boolean{
    if(localStorage.getItem('token'))
      return  true;
    return false;
  }

  logoutUser(){
    if(localStorage.getItem('token'))
        localStorage.removeItem('token')
  }
  
  logoutAdmin(){
    if(localStorage.getItem('tokenAdmin'))
      localStorage.removeItem('tokenAdmin');
  }

  onRatingChange( change: EventRatingChange) {

    var id2: number = change.event.id;

      if (localStorage.getItem("token") && (this.id1 == id2 || this.start)) {
        if ((!this.on && change.changeInRating > 0) || (!this.off && change.changeInRating < 0)) {
         
          this.eventService.changeRating(change.event.id, change.changeInRating)
            .subscribe((res) => this.reloadEventList   
            .next());

          this.id1 = change.event.id;
          this.start = false;
         
          if (change.changeInRating < 0) {
            this.off = true;
            this.on = false;
            this.id1 = null;
            this.start = true;
            alert('You have confirmed your absence')
          }

          if (change.changeInRating > 0) {
            this.off = false;
            this.on = true;
            alert('You have confirmed your attendance')
          }
        }
      }
    
    else {
      alert('You must login to be able to chnage attendence');

    }

  }


}
