import {Component, OnInit} from '@angular/core';
import {BlogService} from '../shared/blog.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: []
})
export class HomeComponent implements OnInit {

  defaultImg = environment.urlBase + '/images/title.jpg';
  img = this.defaultImg;
  public isLoading = false;

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.blogService.onChangedDetail.subscribe(
      (img: string) => {
        this.isLoading = true;
        if (!img || img === 'default') {
          this.img = this.defaultImg;
        } else {
          this.img = environment.urlBase + '/api/file-upload/' + img + '?size=large';
        }
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
