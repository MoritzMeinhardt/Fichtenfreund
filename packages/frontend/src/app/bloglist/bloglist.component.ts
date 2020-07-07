import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Blog } from './blog/blog.model';
import { BlogService } from '../shared/blog.service';

@Component({
  selector: 'app-bloglist',
  templateUrl: './bloglist.component.html',
  styleUrls: ['./bloglist.component.scss']
})
export class BloglistComponent implements OnInit, AfterContentInit {

  page = 10;
  bloglist: Blog[];
  public isLoading = false;

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.blogService.onChangedDetail.next('default');
    this.isLoading = true;
    this.blogService.getBlogs().subscribe(
      (blogs: Blog []) => {
        this.bloglist = blogs;
        this.bloglist.reverse();
      }
    );
  }

  ngAfterContentInit(): void {
    this.isLoading = false;
  }

}
