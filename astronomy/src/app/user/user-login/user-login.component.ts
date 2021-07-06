import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private userService: UserService,private router: Router) { }

  public username: string = '';
  public password: string = '';

  ngOnInit(): void {
  }

  login() {
    this.userService.login(this.username, this.password).subscribe(resp =>{
      localStorage.setItem("token", resp.token)
      this.router.navigate(['/event/list']);
    })
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
