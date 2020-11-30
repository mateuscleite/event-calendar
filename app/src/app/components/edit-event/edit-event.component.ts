import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EventsService } from 'src/app/services/events.service';
import { Event } from '../../classes/event'
import jwt_decode from 'jwt-decode';
import { Subscription } from 'rxjs';

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
    document.getElementById('update-event').scrollIntoView()
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

  //if the end date and time are after the start date and time returns true; otherwise, returns false
  isTimeFrameOk(startFullDate: Date, endFullDate): boolean {
    if(endFullDate.getFullYear() > startFullDate.getFullYear()){
      return true;
    }
    else if(endFullDate.getFullYear() === startFullDate.getFullYear()){
      if(endFullDate.getMonth() > startFullDate.getMonth()){
        return true;
      }
      else if(endFullDate.getMonth() === startFullDate.getMonth()){
        if(endFullDate.getDay() > startFullDate.getDay()){
          return true;
        }
        else if(endFullDate.getDay() === startFullDate.getDay()){
          if(endFullDate.getHours() > startFullDate.getHours()){
            return true;
          }
          else if(endFullDate.getHours() === startFullDate.getHours()){
            if(endFullDate.getMinutes() > startFullDate.getMinutes()){
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  updateEvent(){
    console.log(this.event)
    //checks if a field has only space characters
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
    else{
      console.log("mandou")
      console.log(this.dbEvent)
      const result = this.eventsService.updateEvent(this.dbEvent, this.eventId).subscribe(response => {})
      //window.location.reload();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
