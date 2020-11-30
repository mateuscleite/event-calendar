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
    private eventsService: EventsService
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

  createEvent(){
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
      console.log(this.dbEvent)
      const result = this.eventsService.newEvent(this.dbEvent)
      window.location.reload();
    }
  }

}
