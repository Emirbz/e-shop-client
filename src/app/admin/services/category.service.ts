import {Injectable} from '@angular/core';
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


  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<Category[]> {

    return this.http.get<Category[]>(`${this.categoryAPI}`);
  }

  addCategory(cat): Observable<Category> {

    return this.http.post<Category>(`${this.categoryAPI}`, cat);
  }

  deleteCategory(id: number): Observable<Category> {
    return this.http.delete<Category>(`${this.categoryAPI}/${id}`);

  }

  updateCategory(categoryToEdit: Category): Observable<Category> {
    return this.http.put<Category>(`${this.categoryAPI}/${categoryToEdit.id}`, categoryToEdit);

  }
}
