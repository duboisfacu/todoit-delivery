import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../login/model/user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }


  login(email: string, password: string): Observable < User > {
    return this.http.get < User > (`/api/Login?email=${email}&password=${password}`)
  }

}
