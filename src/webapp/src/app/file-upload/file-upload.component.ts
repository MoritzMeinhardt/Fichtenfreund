import {Component, EventEmitter, Output} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

// const URL = '/api/';
const URL = environment.urlBase +'/api/file-upload'; //'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  selectedFile: File = null;
  @Output() pictureSelected = new EventEmitter<String>();

  constructor(private http: HttpClient) {}

  onFileSelected(event) {
    console.log(event);
    this.selectedFile = <File> event.target.files[0];
  }
  onUpload(){
    const fd = new FormData();
    fd.append('file-to-upload', this.selectedFile, this.selectedFile.name);
    this.http.post(URL, fd).subscribe((res:any) => {
      console.log(res);
      this.pictureSelected.next(res.path);
    })
  }
}
