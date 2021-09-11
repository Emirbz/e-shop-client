import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import Order from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderAPI = environment.apis.order;


  constructor(private http: HttpClient) {
  }

  getOrders(): Observable<Order[]> {

    return this.http.get<Order[]>(`${this.orderAPI}`);
  }

  addOrder(newOrder): Observable<Order> {

    return this.http.post<Order>(`${this.orderAPI}`, newOrder);
  }

  deleteOrder(id: number): Observable<Order> {
    return this.http.delete<Order>(`${this.orderAPI}/${id}`);

  }

  updateOrder(orderToEdit: Order): Observable<Order> {
    return this.http.put<Order>(`${this.orderAPI}/${orderToEdit.id}`, orderToEdit);
  }

}
