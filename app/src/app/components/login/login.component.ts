import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;

  constructor(private authService: AuthService, private router: Router) { 
    this.user = new User();
  }

  ngOnInit(): void {
  }

  async login(){
    try{
      const result = await this.authService.login(this.user)
      console.log(`You logged in ${result} `)

      this.router.navigate([''])
    }
    catch(error){
      console.log(error)
    }
  }

}
