import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EventsService } from 'src/app/services/events.service';
import { Event } from '../../classes/event'
import { Subscription } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit, OnDestroy {

  event = {
    description: '',
    guests: [],
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: ''
  }

  eventId: string;
  dbEvent =new Event();
  subscription: Subscription;

  constructor(
    private authService: AuthService, 
    private eventsService: EventsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setOwner()
    this.getEventId()
    this.getEventData()
  }

  setOwner(){
    const token = this.authService.getAuthToken()
    const tokenDecoded = jwt_decode(token)
    this.dbEvent.owner = tokenDecoded['id']
  }

  getEventId(){
    const url = this.router.url.split('/')
    this.eventId = url[2]
  }

  getEventData(){
    this.subscription = this.eventsService.getEvent(this.eventId)
      .subscribe(response => {
        this.event.description = response['description']
        this.event.guests = response['guests']
        //we have to process the response start and end attributes to get the fields used in the form
        let date = response['start'].split('T')
        this.event.startDate = date[0]
        this.event.startTime = date[1]
        date = response['end'].split('T')
        this.event.endDate = date[0]
        this.event.endTime = date[1]
        document.getElementById('update-event').scrollIntoView()
      })
  }

  convertToDbEvent(){
    this.dbEvent.description = this.event.description
    this.dbEvent.start = this.event.startDate + this.formatTime(this.event.startTime)
    this.dbEvent.end = this.event.endDate + this.formatTime(this.event.endTime)
  }

  //add a T to the start of the time string to adapt to the necessary date format
  formatTime(time: string){
    return `T${time}`;
  }

  //if the end date is after the start date returns true; otherwise, returns false
  isTimeFrameOk(startFullDate: Date, endFullDate: Date): boolean {
    if(startFullDate.getTime() < endFullDate.getTime()){
      return true
    }
    else return false;
  }

    //compares start and end dates of two events to determine if they collide
  //if they do, returns true; otherwise returns false
  eventsCollide(startCompareDate: Date, endCompareDate: Date, startEventDate: Date, endEventDate: Date): boolean {
    const startCompareTime = startCompareDate.getTime()
    const endCompareTime = endCompareDate.getTime()
    const startEventTime = startEventDate.getTime()
    const endEventTime = endEventDate.getTime()

    if(//trivial comparison, if the events start a the same time, they collide
       (startCompareTime === startEventTime) ||
       //another trivial comparison, if the events end at the same time, they collide
       (endCompareTime === endEventTime) ||
       //event starts during the event it is being compared to, so they collide
       (startCompareTime < startEventTime && startEventTime < endCompareTime) ||
       //event finishes during the event it is being compared to, so they collide
       (startCompareTime < endEventTime && endEventTime < endCompareTime) ||
       //event starts and finishes during the event it is being compared to, so the collide
       (startCompareTime < startEventTime && endEventTime < endCompareTime) ||
       //the event it is being compared to starts and finishes during the new event, so they collide
       (startEventTime < startCompareTime && endEventTime > endCompareTime)){
      return true;
    }
    else return false;
  }

  updateEvent(){
    //checks if a field has only space characters or is empty
    if( this.event.description.split(" ").join("") === '' || 
        this.event.endDate.split(" ").join("") === '' ||
        this.event.endTime.split(" ").join("") === '' ||
        this.event.startDate.split(" ").join("") === '' ||
        this.event.startTime.split(" ").join("") === ''
    ){
      alert("Preencha todos os campos")
      return;
    }

    this.convertToDbEvent()
    let startFullDate = new Date(this.dbEvent.start)
    let endFullDate = new Date(this.dbEvent.end)

    if(!this.isTimeFrameOk(startFullDate, endFullDate)){
      alert("A data ou horário de término devem ser maiores que os de início")
      return;
    }
   
    //check for event collision and show a confirmation box if the events collide/overlap
    for(let event of this.eventsService.currentEvents){
      if(this.eventId !== event['_id']){
        let compareStart = new Date(event['start'])
        let compareEnd = new Date(event['end'])
        if(this.eventsCollide(compareStart, compareEnd, startFullDate, endFullDate)){
          const confirmation = confirm(`O evento "${event['description']}" está marcado para o mesmo horário\nVocê deseja marcar o evento "${this.dbEvent.description}" mesmo assim?`);
          if(confirmation === true) {
            this.eventsService.updateEvent(this.dbEvent, this.eventId).subscribe(() => {
              this.router.navigate(['/']).then(() => {
                window.location.reload();
                return;
              });
            })  
          } 
          else return;
        }
        else if(event === this.eventsService.currentEvents[this.eventsService.currentEvents.length - 1]){
          //if there were no event collisions, the new event can be safely updated in the database
          this.eventsService.updateEvent(this.dbEvent, this.eventId).subscribe(() => {
            this.router.navigate(['/']).then(() => {
              window.location.reload();
              return;
            });
          })
        }
      }
    } 
  }

  confirmDeletion(): boolean {
    const confirmation = confirm(`Tem certeza que quer deletar o evento "${this.event.description}"?\nEssa ação não poderá ser desfeita.`);
    if(confirmation === true) {
       return true;
    } 
    else return false;
  }

  deleteEvent(){
    if(this.confirmDeletion()){
      this.eventsService.deleteEvent(this.eventId).subscribe(() => {
        this.router.navigate(['/']).then(() => {
          window.location.reload();
          return;
        });
      })
    }
    else return;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
