import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Blog} from "../blog.model";
import {ActivatedRoute, Params} from "@angular/router";
import {BlogService} from "../../../shared/blog.service";

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  providers: []
})
export class BlogDetailComponent implements OnInit, OnDestroy {

  @Input() myBlog: Blog;
  private id: string;

  constructor(private route: ActivatedRoute,
              private blogService: BlogService) { }

  ngOnInit() {
    if (this.myBlog){

    } else {
      this.route.params.subscribe(
        (params: Params) => {
          console.log(params['id']);
          this.id = params['id'];
          this.blogService.getBlog(this.id).subscribe(
            (blog: Blog) => {
              this.myBlog = blog;
              this.blogService.onChangedDetail.next(this.myBlog.titlePicture);
              console.log('Pushed this image: ' + this.myBlog.titlePicture);
            }
          );
        }
      )
    }
  }

  ngOnDestroy() {
    this.blogService.onChangedDetail.next();
  }
}
