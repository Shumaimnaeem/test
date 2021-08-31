import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { AddedProductsComponent } from './added-products/added-products.component';
import { EditProductsComponent } from './edit-products/edit-products.component';

const routes: Routes = [
  { path:'',component: LoginComponent},
  { path:'home',component: HomeComponent},
  { path:'addProduct',component: AddedProductsComponent},
  { path:'editProduct/:id',component: AddedProductsComponent},

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
