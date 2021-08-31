import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username : any;
  password : any;
  
  constructor(private authService : AuthService,
    private router : Router){}

  ngOnInit(){
    // if(this.authService.isLoggedIn() === true){
    //   this.router.navigate(['/home']);
    // }
  }  
  onSubmit(f: NgForm) {
    console.log("f: ",f.value);
    this.router.navigate(['/home']);
    // this.authService.login(f.value).subscribe(res => {
    //   console.log("Res: ", res);    
    //   this.router.navigate(['/home']);
    // })

  }

}
