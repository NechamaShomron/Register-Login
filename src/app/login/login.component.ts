import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName = '';
  userPassword = '';
  messageConfirmation = '';
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(user: any): any {
    this.apiService.onLogin(user).subscribe((res: any) => {
      if (res.result === 'fail'){
        this.messageConfirmation = 'invalid';
        }
      else {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/home']);
}
  }, (err: any) => console.log(err));
}
}
