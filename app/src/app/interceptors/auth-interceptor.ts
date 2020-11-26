import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private authService: AuthService){

    }

    //used to send the authorization token to the server
    intercept(req: HttpRequest<any>, next: HttpHandler){
        const token = this.authService.getAuthToken()
        let request: HttpRequest<any> = req

        if(token && !this.authService.isTokenExpired(token)){
            request = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            })
        }

        return next.handle(request).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse){
        if(error.error instanceof ErrorEvent){
            //client-side error
            console.error('Error:', error.error.message)
        }
        else{
            //server-side error
            console.error(`Error code: ${error.status}. Error: ${JSON.stringify(error.error)}`)
        }

        return throwError('An error occurred. Please, try again.');
    }
}