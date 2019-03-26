import {Component, OnInit} from '@angular/core';
import {BlogService} from "../shared/blog.service";
import {ActivatedRoute, Params} from "@angular/router";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: []
})
export class HomeComponent implements OnInit {

  defaultImg = 'https://images.unsplash.com/photo-1535725967168-fbfdcdab1f21?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1573&q=80';
  img = this.defaultImg;

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.blogService.onChangedDetail.subscribe(
      (img: string) => {
        if (!img || img === 'default') {
          this.img = this.defaultImg;
        }
        else {
          this.img = environment.urlBase + '/api/file-upload/' + img;
        }
      }
    );
  }

}
