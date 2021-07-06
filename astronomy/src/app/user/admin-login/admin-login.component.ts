import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private userService: UserService,private router: Router) { }

  public username: string = '';
  public password: string = '';

  ngOnInit(): void {
  }

  adminLogin() {
    this.userService.loginAdmin(this.username, this.password).subscribe(resp =>{
      localStorage.setItem("tokenAdmin", resp.token)
      console.log("admin")
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
