import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AstronomyEvent} from 'src/app/model/event';
import 'rxjs/add/operator/first';
import { EventRatingChange } from 'src/app/model/rating-change';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css']
})
export class EventItemComponent  {


  @Input() public event: AstronomyEvent;
  
  @Output() ratingChange: EventEmitter<EventRatingChange> = new EventEmitter();


  constructor(private eventService: EventService, private router: Router) { }


  incrementRating() {
      this.ratingChange.emit({event: this.event, changeInRating: 1});

    
  }

  decrementRating() {
    this.ratingChange.emit({event: this.event, changeInRating: -1});

  }

  delete(){
    console.log('delete ', this.event.id)
    this.eventService.deleteEvent(this.event.id).subscribe(
     (res) => {
        alert("event deleted ")
        this.router.navigate(['/event/list']).then(() => {
          window.location.reload();
        });
      });
  }

  isAdmin():boolean{
    if(localStorage.getItem('tokenAdmin'))
      return  true;
    return false;
  }

  

}
