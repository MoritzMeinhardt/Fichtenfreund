import { Component, OnInit } from '@angular/core';
import {Blog} from "./blog/blog.model";
import {BlogService} from "../shared/blog.service";

@Component({
  selector: 'app-bloglist',
  templateUrl: './bloglist.component.html',
  styleUrls: ['./bloglist.component.scss']
})
export class BloglistComponent implements OnInit {

  page = 10;
  bloglist: Blog[];

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.blogService.onChangedDetail.next('default');
    this.blogService.getBlogs().subscribe(
      (blogs: Blog []) => {this.bloglist = blogs}
    );
  }

}
