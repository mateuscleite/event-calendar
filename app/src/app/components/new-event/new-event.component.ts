import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
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

  dbEvent = {
    owner: '',
    guests: [],
    description: '',
    start: '',
    end: ''
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.setOwner()
  }

  closeForm(){
    
  }

  setOwner(){
    const token = this.authService.getAuthToken()
    const tokenDecoded = jwt_decode(token)
    this.dbEvent.owner = tokenDecoded['id']
  }

  formatTime(time: string){
    return `T${time}`;
  }
  createEvent(){
    console.log(this.event)
    console.log(this.formatTime(this.event.endTime))
  }

}
