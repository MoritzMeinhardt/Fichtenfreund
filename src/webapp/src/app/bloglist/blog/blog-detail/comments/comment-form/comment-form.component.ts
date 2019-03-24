import {Component, Input, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {BlogService} from "../../../../../shared/blog.service";
import {Blog} from "../../../blog.model";

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {

  show = false;
  @Input() myBlog: Blog;
  commentForm: FormGroup;

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.commentForm = new FormGroup( {
      'name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required]),
      'commentText': new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    this.myBlog.comments.push({'name': this.commentForm.get('name').value, 'email': this.commentForm.get('email').value, 'commentText': this.commentForm.get('commentText').value, 'created': Date.now()});
    this.commentForm.reset();
    this.blogService.update(this.myBlog._id, this.myBlog).subscribe(
      (next) => console.log('Comment added'),
    (err) => console.log(err)
    );
  }
}
