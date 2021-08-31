import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { fakeBackendProvider } from './helpers/fake-backend';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './helpers/auth.guard';
import { AddedProductsComponent } from './added-products/added-products.component';
import { EditProductsComponent } from './edit-products/edit-products.component';

import {APOLLO_OPTIONS} from 'apollo-angular';
// import { HttpLink } from 'apollo-angular-link-http';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';
import {split, ApolloClientOptions} from '@apollo/client/core';
import {WebSocketLink} from '@apollo/client/link/ws';
import {getMainDefinition} from '@apollo/client/utilities';


// const wsLink = new WebSocketLink({
//   uri: 'wss://localhost:3000/graphql',
//   options: {
//     reconnect: true
//   }
// });
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AddedProductsComponent,
    EditProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // HttpLink,
    // Apollo,
    RouterModule.forRoot([
      {path:'',component:LoginComponent},
      {path:'home',component:HomeComponent},
    ])
  ],
  providers: [ 
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:3000/graphql/',
          }),
        };
      },
      deps: [HttpLink],
    },



    // {
    //   provide: APOLLO_OPTIONS,
    //   useFactory(httpLink: HttpLink): ApolloClientOptions<any> {
    //     // Create an http link:
    //     const http = httpLink.create({
    //       uri: 'http://localhost:3000/graphql/',
    //     });

        // Create a WebSocket link:
        // const ws = new WebSocketLink({
        //   uri: `ws://localhost:5000`,
        //   options: {
        //     reconnect: true,
        //   },
        // });

        // using the ability to split links, you can send data to each link
        // depending on what kind of operation is being sent
        // const link = split(
        //   // split based on operation type
        //   ({query}) => {
        //     const data = getMainDefinition(query);
        //     return (
        //       data.kind === 'OperationDefinition' && data.operation === 'subscription'
        //     );
        //   },
        //   ws,
          // http,
        // );

        // return {
          // link,
          
          // cache : new InMemoryCache(),
        // };
      // },
      // deps: [HttpLink],
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor(apollo :Apollo, httpLink : HttpLink){
  //   apollo.create({uri:'http://localhost:3000/graphql/'})
  //   cache : new InMemoryCache();
  // }
 }
