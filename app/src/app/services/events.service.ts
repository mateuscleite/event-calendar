import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Event } from '../classes/event';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUserEvents(){
    const token = this.authService.getAuthToken()
    const tokenDecoded = jwt_decode(token)
    return this.http.get<any[]>(`${environment.API}events/owner/${tokenDecoded['id']}`)
  }

  getEvent(id: string){
    return this.http.get<any>(`${environment.API}events/${id}`)
  }
  
  newEvent(event: Event){
    return this.http.post<any>(`${environment.API}events`, event)
  }

  updateEvent(event: Event, id: string){
    console.log("Is updating")
    console.log(event)
    console.log(id)
    return this.http.put<Event>(`${environment.API}events/${id}`, event)
  }


}
