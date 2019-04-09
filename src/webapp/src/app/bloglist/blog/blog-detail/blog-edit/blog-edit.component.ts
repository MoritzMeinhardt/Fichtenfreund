import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {BlogService} from "../../../../shared/blog.service";
import {Blog} from "../../blog.model";
import {ActivatedRoute, Params} from "@angular/router";
import { FileUploader } from 'ng2-file-upload';
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit {

  editBlogForm: FormGroup;
  private id: string;
  private myBlog: Blog;
  submitText = 'Speichern';
  showPreview = false;
  progress = 0;

  constructor(private blogService: BlogService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.editBlogForm = new FormGroup( {
/*      'test': new FormGroup({}),*/
        'title': new FormControl(null),
        'titlePicture': new FormControl(null),
        'date': new FormControl(null),
        'paragraphs': new FormArray([])
    });

    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if (this.id) {
          this.submitText = 'Aktualisieren';
          this.blogService.getBlog(this.id).subscribe(
            (blog: Blog) => {
              this.myBlog = blog;
              this.fillForm();
              this.blogService.onChangedDetail.next(this.myBlog.titlePicture);
            }
          );
        }
      }
    )

  }

  fillForm() {
    this.editBlogForm.patchValue(
      {
        'title': this.myBlog.title,
        'titlePicture': this.myBlog.titlePicture
      }
    );
    this.myBlog.paragraphs.forEach((p) => {
      (<FormArray>this.editBlogForm.get('paragraphs')).push(this.OnPrepopulateParagraph(p));
    });
  }

/*  onCreateParagraph() {
    return new FormGroup({
        'paragraphTitle': new FormControl(null),
        'paragraphPic': new FormControl(null),
        'paragraphText': new FormControl(null)
      }
    );
  }*/
  OnPrepopulateParagraph(p: any) {
    return new FormGroup({
        'paragraphTitle': new FormControl(p.paragraphTitle),
        'paragraphPic': new FormControl(p.paragraphPic),
        'paragraphText': new FormControl(p.paragraphText)
      }
    );
  }

  onAddParagraph() {
    const formGroup = new FormGroup({
        'paragraphTitle': new FormControl(null),
        'paragraphPic': new FormControl(null),
        'paragraphText': new FormControl(null)
      }
    );
    (<FormArray>this.editBlogForm.get('paragraphs')).push(formGroup);
  }

  onDeleteParagraph(index: number) {
    (<FormArray>this.editBlogForm.get('paragraphs')).removeAt(index);
  }

  onSubmit() {
    const blog = new Blog(this.editBlogForm.get('title').value, this.editBlogForm.get('titlePicture').value, new Date(Date.now()), 'PLATZHALTER', this.editBlogForm.get('paragraphs').value, []);
    if (this.id) {
      this.blogService.update(this.id, blog).subscribe(
        (next) => console.log('Update:' + next),
        (err) => console.log('Update:' + err)
      );
    } else {
      this.blogService.add(blog).subscribe(
        (next) => console.log('Add: ' + next),
        (err) => console.log('Add: ' + err)
      );
    }
  }

  onPreview() {
    this.myBlog = new Blog(this.editBlogForm.get('title').value, this.editBlogForm.get('titlePicture').value, new Date(Date.now()), 'PLATZHALTER', this.editBlogForm.get('paragraphs').value, []);
    this.showPreview = true;
  }

  onDelete() {
    this.blogService.delete(this.id).subscribe(
      (next) => console.log('Deleted: ' + this.id),
      (err) => console.log('Delete: ' + err)
    );
  }

  get paragraphs() { return <FormArray>this.editBlogForm.get('paragraphs'); }

  onMainPictureSelected(path) {
    this.editBlogForm.patchValue(
      {'titlePicture': path}
    );
  }

  onPictureSelected(path, index, c:FormGroup) {
    console.log(c);
    c.patchValue({'paragraphPic': path})
    console.log(c);
  }

  onProgress(progress) {
    this.progress = progress * 100;
  }
}
