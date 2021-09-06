import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import Product from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productAPI = environment.apis.product;


  constructor(private http: HttpClient) {
  }

  addProduct(newProduct): Observable<Product> {

    return this.http.post<Product>(`${this.productAPI}`, newProduct);
  }

  getSingleProduct(id): Observable<Product> {

    return this.http.get<Product>(`${this.productAPI}/${id}`);
  }

  updateProduct(id, updatedProduct): Observable<Product> {

    return this.http.put<Product>(`${this.productAPI}/${id}`, updatedProduct);
  }

  deleteProduct(id): Observable<Product> {

    return this.http.delete<Product>(`${this.productAPI}/${id}`);
  }
  getAllProducts(): Observable<any> {

    return this.http.get<any>(`${this.productAPI}`);
  }
}
