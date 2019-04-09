import {Component, EventEmitter, Output} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpRequest, HttpResponse} from "@angular/common/http";

const URL = environment.urlBase +'/api/file-upload';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  selectedFile: File = null;
  @Output() pictureSelected = new EventEmitter<String>();
  @Output() progress = new EventEmitter<String>();

  constructor(private http: HttpClient) {}

  onFileSelected(event) {
    this.selectedFile = <File> event.target.files[0];
  }
  onUpload() {
    const fd = new FormData();
    fd.append('file-to-upload', this.selectedFile, this.selectedFile.name);
    this.http.post(URL, fd, { reportProgress: true, observe: 'events' }).subscribe((res:any) => {
      if (res instanceof HttpResponse){ // TODO better condition
        this.pictureSelected.next(res.body.path);
      } else {
        if (res.type === 1) {
          this.progress.next('' + res.loaded / res.total);
        }
      }
    });
  }
}
