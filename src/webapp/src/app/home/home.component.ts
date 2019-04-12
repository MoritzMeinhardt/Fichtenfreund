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

  defaultImg = environment.urlBase + '/api/file-upload/_MG_8434.jpg';
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
