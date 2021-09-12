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
    const newFileName = file.name.replace(/[^A-Z0-9]+/ig, '_');
    const blob = file.slice(0, file.size, file.type);
    const newFile = new File([blob], newFileName, {type: file.type});
    const formData: FormData = new FormData();

    formData.append('file', newFile);

    return this.http.post(`${this.fileStorageUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });


  }
}
