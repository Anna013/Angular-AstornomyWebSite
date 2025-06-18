import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isAdmin():boolean{
    if(localStorage.getItem('tokenAdmin'))
      return  true;
    return false;
  }
  isUser():boolean{
    if(localStorage.getItem('token'))
      return  true;
    return false;
  }

  logoutUser(){
    if(localStorage.getItem('token'))
        localStorage.removeItem('token')
  }
  
  logoutAdmin(){
    if(localStorage.getItem('tokenAdmin'))
      localStorage.removeItem('tokenAdmin');
  }

}
