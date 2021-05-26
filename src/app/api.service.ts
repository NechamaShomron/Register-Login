import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  // tslint:disable-next-line:typedef
  // getting result (fail or success) and sending in on to onLogin in login component

  onLogin(user: any): any{
    const result = this.http.post('http://localhost:3000/login', user);
    return result;
  }
  onRegister(user: any): any{
    const result = this.http.post('http://localhost:3000/register', user);
    return result;
  }
  }