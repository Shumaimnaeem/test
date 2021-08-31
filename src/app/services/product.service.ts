import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}`;

  httpOptions ={
    headers : new HttpHeaders({
      'Content-type' : 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  getProducts(){    
    
    let token = localStorage.getItem('user');
    console.log("token :", token);
    let headers = new HttpHeaders({'Authorization':'Bearer '+ 'fake-jwt-token'});
    console.log("headers: ", headers);
    return this.http.get(`${this.apiUrl}/getAllProducts`,{headers:headers}).pipe(map(res => {
      console.log("res: ", res);
      return res;
    }))
  }

  addProduct(p:any){
    console.log("pro: ", p);
    console.log("api url", `${this.apiUrl}/addProduct`);
    
    return this.http.post(`${this.apiUrl}/addProduct`,p);
  }
  editProduct(p:any){
    console.log("pro: ", p);
    return this.http.patch(`${this.apiUrl}/editProduct`,p);
  }
  deleteProduct(p :any){
    console.log("to del: ", p);
    
    return this.http.delete(`${this.apiUrl}/deleteProduct/${p.id}`).pipe(map(res => {
      console.log("delP : ", res);
      return res;
    }));
  }

  getProductById(id:number){
    console.log("ii: ", +id);
    return this.http.get(`${this.apiUrl}/getProductById/${id}`).pipe(map(res => {
      console.log("ProductById : ", res);
      return res;
    }));
  }

}
