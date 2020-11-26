import { Component, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  async createAccount(){
    try{
      const result = await this.authService.createAccount(this.newUser)
      console.log(result)
    }
    catch(error){
      console.log(error)
    }
  }

}
