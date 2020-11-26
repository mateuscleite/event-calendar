import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = environment.API;

  constructor(private http: HttpClient) { }

  login(user: User){
    
  }
}
