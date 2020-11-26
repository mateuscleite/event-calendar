import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = environment.API;

  constructor(private http: HttpClient) { }

  async login(user: User){
    const result = await this.http.post<any>(`${environment.API}auth/login`, user).toPromise()
    if(result && result.access_token){
      window.localStorage.setItem('token', result.access_token)
      return true;
    }
    else{
      return false;
    }
  }

  async createAccount(newUser: any){
    const result = await this.http.post<any>(`${environment.API}users`, newUser).toPromise()
    return result;
  }

  getAuthToken(){
    const token = window.localStorage.getItem('token')
    return token;
  }

  getTokenExpirationDate(token: string): Date{
    const tokenDecoded: any = jwt_decode(token)

    if(tokenDecoded.exp === undefined){
      return null;
    }
    else{
      const date = new Date(0)
      date.setUTCSeconds(tokenDecoded.exp)
      return date
    }
  }

  isTokenExpired(token?: string): boolean{
    //no token, practically it means it is expired
    if(!token){
      return true;
    }

    //token with no expiration date doesn't expire
    const date = this.getTokenExpirationDate(token)
    if(date === undefined){
      return false;
    }

    //if the expiration date of the token is greater than the current date, the token has expired; otherwise, it is valid
    return !(date.valueOf() > new Date().valueOf());
  }

  isUserLoggedIn(){
    const token = this.getAuthToken()
    if(token){
      if(this.isTokenExpired(token)){
        return false;
      }
      else{
        return true;
      }
    }
    else{
      return false;
    }
  }

}
