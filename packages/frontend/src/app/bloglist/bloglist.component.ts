import { Component, OnInit } from '@angular/core';
import { Blog } from './blog/blog.model';
import { BlogService } from '../shared/blog.service';
import { Page } from './blog/page.model';

@Component({
  selector: 'app-bloglist',
  templateUrl: './bloglist.component.html',
  styleUrls: ['./bloglist.component.scss']
})
export class BloglistComponent implements OnInit {

  currentPage: Page;
  bloglist: Blog[];
  numbers: number[];
  public isLoading = false;

  constructor(private blogService: BlogService) {
  }

  ngOnInit() {
    // this.page = TODO set here page from url
    this.blogService.onChangedDetail.next('default');
    this.getBlogs(0);
  }

  getBlogs(pageNo: number) {
    this.isLoading = true;
    this.blogService.getBlogs(pageNo).subscribe(
      (blogPage: Page) => {
        this.currentPage = blogPage;
        this.bloglist = this.currentPage.content;
        this.bloglist.reverse();
        this.numbers = Array(this.currentPage.totalPages).fill(1, 0, this.currentPage.totalPages).map((x, i) => i);
        this.isLoading = false;
      }
    );
  }

  onPageClick(pageNo: number) {
    this.getBlogs(pageNo);
  }

}
