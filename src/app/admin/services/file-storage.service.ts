import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpEvent, HttpEventType} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map, mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {

  private fileStorageUrl = environment.apis.file;

  constructor(private http: HttpClient) {
  }


  public upload(file: File): Observable<any> {
    console.log(this.fileStorageUrl);
    const formData: FormData = new FormData();

    formData.append('file', file);

    return this.http.post(`${this.fileStorageUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });


  }
}
