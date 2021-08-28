import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import Product from '../models/Product';
import Category from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryAPI = environment.apis.category;


  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {

    return this.http.get<Category[]>(`${this.categoryAPI}`);
  }
}
