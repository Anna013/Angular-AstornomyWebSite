import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AstronomyEvent } from 'src/app/model/event';
import { EventService } from 'src/app/services/event.service';



@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {

  constructor(private eventService: EventService, private router: Router) { }

  
  createEvent(eventForm) {
  
    var date: Date = new Date();
    const astronomyEvent: AstronomyEvent = eventForm.value.event;

    var eventDate: Date = new Date(astronomyEvent.date)
    var next = eventDate.getTime() > date.getTime();

    if (next) {
      this.eventService.addEvent(astronomyEvent).subscribe((res) => {
        alert("event created")
        this.router.navigate(['/event/list']);
      })
    }

    else
      alert('You must choose a date in the future!')
  }




}
