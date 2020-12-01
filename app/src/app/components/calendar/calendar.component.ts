import { Component, OnDestroy, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import ptBr from '@fullcalendar/core/locales/pt-br'
import jwt_decode from 'jwt-decode'
import { Subscription } from 'rxjs';
import { EventsService } from 'src/app/services/events.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnDestroy {

  events: any[] = new Array();
  calendarEvents: any[] = [];
  subscription: Subscription;
  welcomeMessage: string;
  user: Object;
  option: string;

  calendarOptions: CalendarOptions = {
    timeZone: 'local',
    locale: ptBr,
    themeSystem: 'bootstrap',
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'dayGridMonth,timeGridWeek,timeGridDay listMonth',
      center: 'title',
      right: 'today prev,next'
    },
    events: this.calendarEvents,
    eventClick: (info) => { 
      this.router.navigate([`/edit/${info.event.id}`]).then(() => {
        window.location.reload();
      });
    },
    dayMaxEventRows: true,
    moreLinkClick: 'popover',
    nowIndicator: true 
  };

  constructor(
    private authService: AuthService, 
    private eventsService: EventsService,
    private router: Router) { 
    }

  ngOnInit(): void {
    //get the user information provided by the user token
    const token = this.authService.getAuthToken()
    const tokenDecoded = jwt_decode(token)
    this.user = tokenDecoded

    this.option = ''

    this.calendarEvents = [];
    this.setWelcomeMessage()
    this.loadEvents()
  }

  loadEvents(){
    this.subscription = this.eventsService.getUserEvents()
      .subscribe(response => {
        this.events = response
        for(let event of this.events){
          this.calendarEvents.push({
            title: event['description'],
            start: event['start'],
            end: event['end'],
            id: event['_id']
          })
        }
        //update the calendar view with the data retrieved from the server
        this.calendarOptions.events = this.calendarEvents
        //set the currentEvents in the eventsService so other components can have access to the events for validation
        this.eventsService.setCurrentEvents(this.events)
      })
  }

  getCurrentTime(){
    const today = new Date()
    return today.getHours();
  }

  //sets a different welcome message according to the current time
  setWelcomeMessage(){
    const currentTime = this.getCurrentTime()
    if(currentTime >= 5 && currentTime <= 11){
      this.welcomeMessage = `Bom dia, ${this.user['name']}!`
    }
    else if(currentTime >= 12 && currentTime <= 18){
      this.welcomeMessage = `Boa tarde, ${this.user['name']}!`
    }
    else if(currentTime >= 19 || currentTime <= 4){
      this.welcomeMessage = `Boa noite, ${this.user['name']}!`
    }
  }

  logout(){
    this.authService.logout()
    window.location.reload();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
