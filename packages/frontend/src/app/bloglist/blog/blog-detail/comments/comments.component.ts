import {Component, Input, OnInit} from '@angular/core';
import {Blog} from '../../blog.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() myBlog: Blog;

  constructor() { }

  ngOnInit() {}

}
