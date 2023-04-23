import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  apiurl = 'http://3.17.216.66:3000/';

  uploadFile(formData: any) {
    return this.http.post(this.apiurl + 'files/uploadfile', formData)
  }

  getFileOrPhotoById(photoId: any){
    return this.http.get(this.apiurl+ 'files/' + photoId, {responseType: 'blob'})
  }
}
