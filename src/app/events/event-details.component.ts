import { Component, OnInit } from '@angular/core'
import { EventService } from '../shared/event-service'
import { ActivatedRoute, Router } from '@angular/router'
import { IEvent } from '../shared';

@Component({
    templateUrl:'./event-details.component.html',
    styles:[`
        .container { padding-left:20px; padding-right: 20px; }
        .event-image {height: 100px;}
    `]
})

export class EventDetailsComponent implements OnInit{

    event : IEvent;

    constructor(private eventService : EventService, private route: ActivatedRoute, private router : Router){        
    }

    ngOnInit(): void{
        //this.route.snapshot.params["id"];
        this.event = this.eventService.getEvent(+this.route.snapshot.params["id"]);
    }

    back() {
        this.router.navigate(['/events']);
    }
}
