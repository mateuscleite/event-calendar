import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventsService } from 'src/app/services/events.service';
import { CalendarOptions } from '@fullcalendar/angular';
import ptBr from '@fullcalendar/core/locales/pt-br'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  events: any[] = new Array()
  subscription: Subscription

  calendarOptions: CalendarOptions = {
    timeZone: 'local',
    locale: ptBr,
    themeSystem: 'bootstrap',
    initialView: 'timeGridWeek',
    events: [
      { title: 'event 1', start: '2020-11-26T00:00:00', end: '2020-11-26T03:00:00' },
      { title: 'event 2', date: '2020-11-27' }
    ]
  };

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.loadEvents()
  }

  loadEvents(){
    this.subscription = this.eventsService.getUserEvents()
      .subscribe(response => {
        this.events = response
        console.log(this.events)
      })
  }

}
