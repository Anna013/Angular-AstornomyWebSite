import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  host = "http://localhost:3000/";

  constructor(private httpClient: HttpClient) { }


 login(username: string, password: string): Observable<any> {
  return this.httpClient.post(this.host + "api/user/userlogin", {
    username: username,
    password: password
  }).pipe(map((resp: any) => {
    return resp;
  }))
}

loginAdmin(username: string, password: string): Observable<any> {
  return this.httpClient.post(this.host + "api/user/adminlogin", {
    username: username,
    password: password
  }).pipe(map((resp: any) => {
    return resp;
  }))
}

register(username: string, password: string): Observable<any> {
  return this.httpClient.post(this.host + "api/user/register", {
    username: username,
    password: password
  })
}
}
