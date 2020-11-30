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
      this.user.email.trim()
      this.user.password.trim()
      const result = await this.authService.login(this.user)
      this.router.navigate([''])
    }
    catch(error){
      alert("E-mail ou senha inválidos. Tente novamente.")
      console.log(error)
    }
  }

}
