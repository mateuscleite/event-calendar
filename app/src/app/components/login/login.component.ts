import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: User;

  constructor(private authService: AuthService) { 
    this.user = new User();
  }

  ngOnInit(): void {
  }

  login(){
    console.log(this.user)
  }

}
