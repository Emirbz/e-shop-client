import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import Sale from '../models/Sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  saleAPI = environment.apis.sale;


  constructor(private http: HttpClient) {
  }

  getSales(): Observable<Sale[]> {

    return this.http.get<Sale[]>(`${this.saleAPI}`);
  }

  addSale(id, sale): Observable<Sale> {

    return this.http.post<Sale>(`${this.saleAPI}/${id}`, sale);
  }

  deleteSale(id: number): Observable<Sale> {
    return this.http.delete<Sale>(`${this.saleAPI}/${id}`);

  }

  updateSale(saleToEdit: Sale): Observable<Sale> {
    return this.http.put<Sale>(`${this.saleAPI}/${saleToEdit.id}`, saleToEdit);
  }
}
