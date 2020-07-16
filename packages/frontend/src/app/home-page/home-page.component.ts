import { Component, OnInit } from '@angular/core';
import { BlogService } from '../shared/blog.service';
import { Page } from '../bloglist/blog/page.model';
import { environment } from '../../environments/environment';
import { Blog } from '../bloglist/blog/blog.model';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  previewBlogs: Blog[];
  baseUrl = environment.urlBase;
  
  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit() {
    this.blogService.getBlogs(0, 3).subscribe(
      (page: Page) => this.previewBlogs = page.content
    );
  }

  onNavigateToDetailPage (id: string) {
    this.router.navigateByUrl(`/blog/${id}`);
  };

}
