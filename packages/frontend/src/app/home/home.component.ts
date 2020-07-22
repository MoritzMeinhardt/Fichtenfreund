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

  constructor() {}

  ngOnInit() {
  }

}
