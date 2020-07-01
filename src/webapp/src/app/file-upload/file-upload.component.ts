import { Component, EventEmitter, Output } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { AuthService } from "../shared/auth.service";

const URL = environment.urlBase + '/api/file-upload';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  selectedFile: File = null;
  @Output() pictureSelected = new EventEmitter<String>();
  @Output() progress = new EventEmitter<String>();

  constructor(private http: HttpClient, private authService: AuthService) {}

  onFileSelected(event) {
    this.selectedFile = <File> event.target.files[0];
    this.uploadFIle();
  }
  uploadFIle() {
    const token = this.authService.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'reportProgress': 'true',
        'observe': 'events'
      })
    };
    const fd = new FormData();
    fd.append('file-to-upload', this.selectedFile, this.selectedFile.name);
    this.http.post(URL, fd, httpOptions).subscribe((res: any) => {
      if (res instanceof HttpResponse) { // TODO better condition
        this.pictureSelected.next(res.body);
      } else {
        if (res.type === 1) {
          this.progress.next('' + res.loaded / res.total);
        }
      }
    });
  }
}
