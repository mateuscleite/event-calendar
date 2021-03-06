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

  currentEvents: any[] = new Array();

  constructor(private http: HttpClient, private authService: AuthService) { }

  setCurrentEvents(events: any[]){
    this.currentEvents = events
  }

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
    return this.http.put<Event>(`${environment.API}events/${id}`, event)
  }

  deleteEvent(id: string){
    return this.http.delete<any>(`${environment.API}events/${id}`)
  }

}
