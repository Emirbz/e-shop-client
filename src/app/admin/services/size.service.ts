import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import Size from '../models/Size';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  sizeAPI = environment.apis.size;


  constructor(private http: HttpClient) {
  }

  getSizes(): Observable<Size[]> {

    return this.http.get<Size[]>(`${this.sizeAPI}`);
  }

  addSize(cat): Observable<Size> {

    return this.http.post<Size>(`${this.sizeAPI}`, cat);
  }

  deleteSize(id: number): Observable<Size> {
    return this.http.delete<Size>(`${this.sizeAPI}/${id}`);

  }

  updateSize(SizeToEdit: Size): Observable<Size> {
    return this.http.put<Size>(`${this.sizeAPI}/${SizeToEdit.id}`, SizeToEdit);
  }
}
