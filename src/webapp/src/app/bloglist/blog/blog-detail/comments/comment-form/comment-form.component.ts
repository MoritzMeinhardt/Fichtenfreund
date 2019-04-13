import {Component, Input, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {BlogService} from "../../../../../shared/blog.service";
import {Blog} from "../../../blog.model";
import {AlertService} from "../../../../../shared/alert.service";
import {Alert} from "../../../../../alerts/alert.model";

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {

  show = false;
  @Input() myBlog: Blog;
  commentForm: FormGroup;

  constructor(private blogService: BlogService, private alertService: AlertService) { }

  ngOnInit() {
    this.commentForm = new FormGroup( {
      'name': new FormControl(null, [Validators.required]),
      'commentText': new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    this.myBlog.comments.push({'name': this.commentForm.get('name').value, 'commentText': this.commentForm.get('commentText').value, 'created': Date.now()});
    this.commentForm.reset();
    this.blogService.update(this.myBlog._id, this.myBlog).subscribe(
      (next) => this.alertService.addAlert(new Alert('Danke für dein Kommentar :)', 'success')),
    (err) => this.alertService.addAlert(new Alert('Hups, das hat nicht funktioniert. ' + err, 'danger'))
    );
  }
}
