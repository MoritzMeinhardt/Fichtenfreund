import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Blog } from '../blog.model';
import { ActivatedRoute, Params } from '@angular/router';
import { BlogService } from '../../../shared/blog.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../shared/auth.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  providers: []
})
export class BlogDetailComponent implements OnInit, OnDestroy {

  @Input() myBlog: Blog;
  private id: string;
  public baseUrl = environment.urlBase;
  public isAuthenticated = false;
  public isLoading = true;
  public images = [];

  constructor(private route: ActivatedRoute,
              private blogService: BlogService,
              private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    if (this.myBlog) {

    } else {
      this.isAuthenticated = this.authService.isAuthenticated();

      this.route.params.subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.blogService.getBlog(this.id).subscribe(
            (blog: Blog) => {
              this.myBlog = blog;
              this.blogService.onChangedDetail.next(this.myBlog.titlePicture);
              this.isLoading = false;
            }
          );
        }
      );
    }
  }

  ngOnDestroy() {
    this.blogService.onChangedDetail.next();
  }
}
