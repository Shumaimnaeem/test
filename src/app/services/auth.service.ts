import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root' 
})
export class AuthService {

  constructor(private http : HttpClient) { }
  public get currentUser() {
    let cu =localStorage.getItem('user');
    return cu;
  }
  isLoggedIn(){
    let cu =localStorage.getItem('user');
    if(cu)
      return true;
    else
      return false;  
  }
  login(cred:any){
    console.log("Cred: ", cred);
    
    return this.http.post('/api/authenticate',JSON.stringify(cred)).pipe(map(res => {
      console.log("res: ", res);
      localStorage.setItem('user', JSON.stringify(res));
      return res;
    }))
  }
  logout(){
    localStorage.removeItem('user');
  }
}
