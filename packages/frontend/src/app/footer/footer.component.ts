import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public basePath = environment.urlBase;
  private accessToken = '12729826979.1677ed0.d922b0b63fd249de8f357ec44c27415d'; // TODO create one in case of error
  private instagramApi = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=';
  public feed: string [] = new Array(10);

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(this.instagramApi + this.accessToken).subscribe(
      (next: any) => {
        for (let i = 0; i < this.feed.length; i++) {
          this.feed[i] = next.data[i].images.standard_resolution.url;
        }
        },
      (err) => {}
    );
  }

}
