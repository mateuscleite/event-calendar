import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EventsService } from 'src/app/services/events.service';
import { Event } from '../../classes/event'
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {

  event = {
    description: '',
    guests: [],
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: ''
  }

  dbEvent = new Event()

  constructor(
    private authService: AuthService, 
    private eventsService: EventsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setOwner()
    document.getElementById('new-event').scrollIntoView();
  }

  setOwner(){
    const token = this.authService.getAuthToken()
    const tokenDecoded = jwt_decode(token)
    this.dbEvent.owner = tokenDecoded['id']
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

  createEvent(){
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
    
    //check for event collision and show a confirmation box if the events collid/overlap
    for(let event of this.eventsService.currentEvents){
      let compareStart = new Date(event['start'])
      let compareEnd = new Date(event['end'])
      if(this.eventsCollide(compareStart, compareEnd, startFullDate, endFullDate)){
        const confirmation = confirm(`O evento "${event['description']}" está marcado para o mesmo horário\nVocê deseja marcar o evento "${this.dbEvent.description}" mesmo assim?`);
        if(confirmation === true) {
          const result = this.eventsService.newEvent(this.dbEvent).subscribe(() => {
            this.router.navigate(['/']).then(() => {
              window.location.reload()
            }) 
          })     
        } 
        else return false;
      }
    } 

    //if there were no event collisions, the new event can be safely added to the database
    const result = this.eventsService.newEvent(this.dbEvent).subscribe(() => {
      this.router.navigate(['/']).then(() => {
        window.location.reload()
      }) 
    }) 
  }

}
