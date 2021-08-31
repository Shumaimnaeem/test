import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Product } from '../models';
import { ProductService } from '../services/product.service';
import { FormGroup, FormControl, FormArray, Validators , ReactiveFormsModule, FormsModule} from '@angular/forms';
import { Apollo, gql} from 'apollo-angular';


const getProductByIds = gql `
query($id: Int) {
  getProductById(id : $id){
    id
    title
    description
  }
}`;
const updateProductById = gql `
mutation($id: Int! ,$title : String!, $description : String!) {
  updateProduct(id : $id , title : $title , description : $description){
    id
    title
    description
  }
}`;
const addProduct = gql `
mutation($id: Int ,$title : String!, $description : String) {
  addProduct(id : $id , title : $title , description : $description){
    id
    title
    description
  }
}`;

@Component({
  selector: 'app-added-products',
  templateUrl: './added-products.component.html',
  styleUrls: ['./added-products.component.css']
})
export class AddedProductsComponent implements OnInit {
  product : Product = new Product();
  entered : boolean = false;
  addProductForm: FormGroup = new FormGroup({
    'title': new FormControl(null, Validators.required),
    'description': new FormControl(null),
  });

  constructor(private router : Router, private route : ActivatedRoute,
              private productService :ProductService, private apollo : Apollo
             ) {}

  ngOnInit(): void {
    const id = this.route?.snapshot?.paramMap?.get('id');
    if(id){
      console.log("Id: ", id);
      this.apollo.watchQuery({
        query: getProductByIds,
        variables:{
          id: +id,
        },
        }).valueChanges.subscribe((res:any) => {
          console.log("Res: ", res);
          this.product.title = res?.data?.getProductById[0]?.title;
          this.product.description = res?.data?.getProductById[0]?.description;
        });
      // this.productService.getProductById(+id).subscribe((res:any) =>{
      //   console.log("Prod: ", res[0]);
      //   this.product.title = res[0].title;
      //   this.product.description = res[0].description;
      // })
    }

  }
  save(){
    
    this.entered = true;
    const id = this.route?.snapshot?.paramMap?.get('id');
    if(id){
      this.product.id = +id;
      this.apollo.mutate({
        mutation: updateProductById,
        variables: {
          id: this.product.id,
          title : this.product.title,
          description : this.product.description
        }
      }).subscribe(({ data }) => {
        console.log('got data', data);
        this.router.navigate(['/home'])
      },(error) => {
        console.log('there was an error sending the query', error);
      });
    }

      // this.productService.editProduct(this.product).subscribe(res =>{
      //   console.log("edited: ", res);
      //   this.router.navigate(['/home'])
      // });
    // }
    this.product.title= this.addProductForm.get('title')?.value;
    this.product.description = this.addProductForm.get('description')?.value
    if(!id && this.product.title){
      let id = Math.floor((Math.random() * 100) + 1);
      
      console.log("id: ", id);
      
      this.apollo.mutate({
        mutation: addProduct,
        variables: {
          id: id,
          title : this.product.title,
          description : this.product.description
        }
      }).subscribe(( data) => {
        console.log('got data', data);
        this.router.navigate(['/home'])
      },(error) => {
        console.log('there was an error sending the query', error);
      });


    // this.productService.addProduct(this.product).subscribe(res =>{
    //     console.log("add: ", res);
    //     this.router.navigate(['/home'])
    //   });
    }
  }
}
