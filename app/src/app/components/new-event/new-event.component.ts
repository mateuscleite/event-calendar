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
    //checks if a field has only space characters
    if( this.event.description.split(" ").join("") === '' || 
        this.event.endDate.split(" ").join("") === '' ||
        this.event.endTime.split(" ").join("") === '' ||
        this.event.startDate.split(" ").join("") === '' ||
        this.event.startTime.split(" ").join("") === ''
    ){
      alert("Preecha todos os campos")
    }
    console.log(this.formatTime(this.event.endTime))
  }

}
