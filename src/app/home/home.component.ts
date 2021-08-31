import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';
import { Product } from '../models';
import { Apollo, QueryRef, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
// import { gql } from 'graphql-tag';
import { product, Query } from '../types';

import { ApolloClient, QueryOptions, MutationOptions, ApolloQueryResult, SubscriptionOptions, ApolloClientOptions } from 'apollo-client';


const getAllProductss = gql `query {
  getAllProducts{
    id
    title
    description
  }
} `;

const deleteProduct = gql `
mutation($id : Int){
  deleteProduct(id : $id){
    id
  }
}`;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title : string ='';
  entered :boolean = false;
  description : string ='';  
  productsQuery: QueryRef<any>;
  products: Observable<any>;

  allProducts :any[] = [];
  constructor(private authService : AuthService, 
    private productService : ProductService,
    private router : Router,
    private appolo : Apollo) { 
      this.productsQuery = this.appolo.watchQuery({
        query: gql`
        {
          getAllProducts{
            id
            title
            description
          }
        } `,
        });
        this.products = this.productsQuery.valueChanges;
        console.log("Products: ", this.products);
        
        
        // .valueChanges.subscribe((res:any) => {
        //   debugger
        //   console.log("Res: ", res);      
        //   this.allProducts = res?.data?.getAllProducts;
        //   console.log("Products: ", this.allProducts);
        // });
    }

  async ngOnInit() {
    // await this.getProducts();
  }

  async getProducts(){
    this.appolo.watchQuery({
      query: gql`
      {
        getAllProducts{
          id
          title
          description
        }
      } `,
      }).valueChanges.subscribe((res:any) => {
        debugger
        console.log("Res: ", res);      
        this.allProducts = res?.data?.getAllProducts;
        console.log("Products: ", this.allProducts);
      });
  }

  async addProduct(){
    this.entered = true;
    let product = new Product();
    product.title = this.title;
    product.description = this.description;
    console.log("added product: ", product);
    if(product.title){
      this.router.navigate(['/addProduct',product]);
      // this.productService.addProduct(product).subscribe(res =>{
      //   console.log("add: ", res);
      // });
    }

  }
  async getAllProducts(){
    this.productService.getProducts().subscribe( (prod:any) => {
      if(prod){
        console.log("prod: ",prod);
        this.products = prod;
        
      }
    });
  }
  async editProduct(p:any){
    let product = new Product();
    product.title = p.title;
    product.description = p.description;
    this.router.navigate(['/editProduct',product]);
  }
  async deleteProduct(p:any){
      this.appolo.mutate({
        mutation: deleteProduct,
        variables: {
          id: p.id,
        }
      }).subscribe(async ({ data }) => {
        console.log('got data', data);
        await this.getProducts();
        // this.router.navigate(['/home'])
      },(error) => {
        console.log('there was an error sending the query', error);
      });
    // this.productService.deleteProduct(p).subscribe(res => {
    //   console.log("del : ", res);
    //   this.getAllProducts();
    // })
    
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/'])
  }
}
