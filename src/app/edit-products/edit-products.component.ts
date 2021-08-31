import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Product } from '../models';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent implements OnInit {
  product : Product = new Product();
  constructor(private router : Router, private route : ActivatedRoute,
              private productService :ProductService
             ) {}

  ngOnInit(): void {
    const id = this.route?.snapshot?.paramMap?.get('id');
    this.productService.getProducts().subscribe((productsObj: any) => {
      this.product = productsObj.body.products.find((p: any) => p.id.toString() === id);
      console.log('dffddfdf', this.product);
    });
  }
  save(){
    this.productService.editProduct(this.product).subscribe(res =>{
        console.log("edited: ", res);
        this.router.navigate(['/home'])
      });
  }
}