import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  newUser = {
    name: '',
    email: '',
    password: ''
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async createAccount(){
    try{
      this.newUser.email.trim()
      this.newUser.name.trim()

      const result = await this.authService.createAccount(this.newUser)
      this.router.navigate([''])
    }
    catch(error){
      alert("Ocorreu um erro ao cadastrar sua conta. Tente novamente.")
      console.log(error)
    }
  }

}
