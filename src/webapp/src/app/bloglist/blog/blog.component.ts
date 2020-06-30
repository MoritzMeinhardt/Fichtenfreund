import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Blog} from "./blog.model";
import {ActivatedRoute, Router} from "@angular/router";
import {BlogService} from "../../shared/blog.service";
import {GALLERY_CONF, GALLERY_IMAGE, NgxImageGalleryComponent} from "ngx-image-gallery";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  @Input() myBlog: Blog;
  public basePath = environment.urlBase;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private blogService: BlogService) { }

  ngOnInit() {

  }

  onDelete() {
    this.blogService.delete(this.myBlog.id).subscribe(
      (next) => console.log(next),
      (err) => console.log(err)
    );
  }

}
