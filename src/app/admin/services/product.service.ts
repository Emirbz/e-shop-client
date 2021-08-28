import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import Product from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productAPI = environment.apis.product;


  constructor(private http: HttpClient) { }

  addMessage(newProduct): Observable<Product> {

    return this.http.post<Product>(`${this.productAPI}`, newProduct);
  }
}
