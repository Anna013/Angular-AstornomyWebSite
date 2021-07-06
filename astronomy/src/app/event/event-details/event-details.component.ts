import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AstronomyEvent } from 'src/app/model/event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  public event: AstronomyEvent;

  constructor(private eventService: EventService, private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    console.log("ana")
    var name = this.route.snapshot.paramMap.get('name');
    console.log(name);
    this.eventService.getEvent(name).subscribe(event => {this.event = event});
  }

}
