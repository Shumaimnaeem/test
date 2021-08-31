import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { Product } from '../models/product.model';

const users: any = [
    { id: 1, username: 'admin@gmail.com', password: 'admin', firstName: 'Admin', lastName: 'User' },
    { id: 2, username: 'user@gmail.com', password: 'user', firstName: 'Normal', lastName: 'User'}
];
const products :Product[] = [
    { id: 1,title : 'book', description : 'Story Book'},
    { id: 2,title : 'book 1', description : 'Story Book 1'}
];
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
        return of(null)
            .pipe(mergeMap(handleRoute));

        function handleRoute() {
            var parts = url.split("/");
            var id = +parts[parts.length - 1];
            switch (true) {
                case url.endsWith('/api/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/api/add') && method === 'POST':
                    return addProduct();
                case url.endsWith('/api/edit') && method === 'PATCH':
                    return editProduct();         
                case url.endsWith('/api/delete') && method === 'POST':
                    return delProduct(); 
                case url.endsWith(`/api/getProductById/${id}`) && method === 'GET':
                    debugger
                    return getProductById();                    
                case url.endsWith('/api/products') && method === 'GET':
                    return getProducts();    
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }
        function getProductById(){
            console.log("url: ", request);
            var parts = url.split("/");
            var id = +parts[parts.length - 1];
            console.log("res: ", id);
            console.log("Products: ", products);
                        
            let product = products.find(p => {
                console.log("p: ", p);
                console.log("id: ", id);
                return p.id === id

            });
            console.log("Searched Product: ", product);
            return ok({
                status: 200.,
                body : product
            });
        }
        function editProduct(){
            const { id,title, description } = body;
            console.log("update: ", id);
            console.log("Products: ", products);
            console.log("Id: ", id);
            console.log("title: ", title);
            for (var i=0; i < products.length; i++) {
                console.log("p[i]", products[i]);
                if (products[i].id === id) {
                    
                    products[i].title = title;
                    products[i].description = description;
                    console.log("pro[iii]", products[i]);
                }
            }
            console.log("Products: ", products);
                        
            // let product = products[index];
            // console.log("update 1: ", product);
            // product.title = title;
            // product.description = description;
            return ok({
                status: 200.,
                body : 'product updated'
            })
        }
        function delProduct(){
            const { title, description } = body;
            console.log("t: ", title);
    
            var index = products.indexOf(body);
            console.log("index: ", index);
            
            if (index > -1) {
                products.splice(index, 1);
                console.log("P: ", products);
                
            }
            return ok({
                status: 200.,
                body : 'product deleted'
            })
        }
        function addProduct(){
            const { title, description } = body;
            console.log("title: ", title);
            console.log("desc: ", description);
            let id = Math.floor((Math.random() * 100) + 1);
            products.push({id,title, description});
            return ok({
                status: 200.,
                body : 'product added'
            })
            
        }
        function getProducts(){
            console.log("H: ", headers);
            if(headers.get('Authorization') === 'Bearer ' + 'fake-jwt-token'){
                return ok({
                    status : 200,
                    body : {products : products}
                })
            }
            else
                return error('UnAuthorized.')
        }
        function authenticate() {
            const { username, password } = JSON.parse(body);
            console.log("Body: ", JSON.parse(body));
            console.log("UN1: ", username);
            console.log("PW1: ", password);
            if(username == '123@gmail.com' && password == '123'){
                return ok({
                    status : 200,
                    token: 'fake-jwt-token'
                })
            }
            else 
                return error('Username or password is incorrect');
            
        }
        function ok(body?:any) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message:string) {
            return throwError({ error: { message } });
        }
    }
}
export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};

