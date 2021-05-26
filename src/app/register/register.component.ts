import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstName = '';
  lastName = '';
  userName = '';
  userPassword = '';
  messageConfirmation = '';
  constructor(private apiService: ApiService, private router : Router) { }

  ngOnInit(): void {
  }
  onRegister(user: any): any{
    if (user.firstName === '' || user.lastName === '' || user.userName === '' || user.userPassword === '' ){
       this.messageConfirmation = 'fill all the fields';
        return;
    }

    this.apiService.onRegister(user).subscribe((res: { result: string; }) => {

      if (res.result === 'success') {
        console.log("registerd");
        this.messageConfirmation = 'You have been registered';
      }
      else if (res.result === 'fail'){
        this.messageConfirmation = 'invalid';
        this.router.navigate(['/register']);

  }
  else if(res.result === 'fail. username exists'){
    this.messageConfirmation = 'username already exists';
    this.router.navigate(['/register']);

       }
    })
  }
}
