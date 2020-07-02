import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {BlogService} from '../../../../shared/blog.service';
import {Blog} from '../../blog.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AlertService} from '../../../../shared/alert.service';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit {

  editBlogForm: FormGroup;
  private id: string;
  public myBlog: Blog;
  submitText = 'save';
  showPreview = false;
  progress = [];
  progress_gallery = [];

  constructor(private blogService: BlogService, private route: ActivatedRoute, private router: Router,
              private alertService: AlertService) { }

  ngOnInit() {

    this.editBlogForm = new FormGroup( {
      'title': new FormControl(null, Validators.required),
      'titlePicture': new FormControl( null),
      'date': new FormControl(null),
      'paragraphs': new FormArray([]),
      'galleryImages': new FormArray([])
    });

    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if (this.id) {
          this.submitText = 'update';
          this.blogService.getBlog(this.id).subscribe(
            (blog: Blog) => {
              this.myBlog = blog;
              this.fillForm();
              this.blogService.onChangedDetail.next(this.myBlog.titlePicture);
            }
          );
        }
      }
    );
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
    this.myBlog.galleryImages.forEach((i) => {
      (<FormArray>this.editBlogForm.get('galleryImages')).push(this.onPrepopulateGalleryImages(i));
    });
  }

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

  onPrepopulateGalleryImages(p: any) {
    return new FormGroup({
        'title': new FormControl(p.title),
        'id': new FormControl(p.id),
        'altText': new FormControl(p.altText)
      }
    );
  }

  onAddGalleryImage() {
    const formGroup = new FormGroup({
        'title': new FormControl(null),
        'id': new FormControl(null),
        'altText': new FormControl(null)
      }
    );
    (<FormArray>this.editBlogForm.get('galleryImages')).push(formGroup);
  }

  onDeleteGalleryImage(index: number) {
    (<FormArray>this.editBlogForm.get('galleryImages')).removeAt(index);
  }

  onSubmit() {

    for (let i = -1; i < this.progress.length; i ++) {
      if (this.progress[i] && this.progress[i] !== 100) {
        alert('Not all images uploaded.');
        return;
      }
    }

    const blog = new Blog(this.editBlogForm.get('title').value,
      this.editBlogForm.get('titlePicture').value,
      new Date(Date.now()), 'PLATZHALTER',
      this.editBlogForm.get('paragraphs').value,
      [], this.editBlogForm.get('galleryImages').value);

    if (this.id) {
      this.blogService.update(this.id, blog).subscribe(
        () => {
          this.alertService.addAlert({message: 'Blog '  + this.editBlogForm.get('title').value + ' successful updated!', type: 'success'});
          this.router.navigate(['/blog/' + this.route.snapshot.params['id']]);
        },
      (err) => {
        this.alertService.addAlert({message: 'Blog '  + this.editBlogForm.get('title').value + ' not updated! ' + err, type: 'danger'});
      });
    } else {
      this.blogService.add(blog).subscribe(
        (next: Blog) => {
          this.alertService.addAlert({message: 'Blog '  + this.editBlogForm.get('title').value + ' successful created!', type: 'success'});
          this.router.navigate(['/blog/' + next.id]);
        },
        (err) => {
          this.alertService.addAlert({message: 'Blog '  + this.editBlogForm.get('title').value + ' not updated! ' + err, type: 'danger'});
        }
      );
    }
  }

  onPreview() {
    this.myBlog = new Blog(this.editBlogForm.get('title').value, this.editBlogForm.get('titlePicture').value,
      new Date(Date.now()), 'PLATZHALTER', this.editBlogForm.get('paragraphs').value, [], this.editBlogForm.get('galleryImages').value);
    this.showPreview = true;
  }

  onDelete() {
    this.blogService.delete(this.id).subscribe(
      (next) => console.log('Deleted: ' + this.id),
      (err) => console.log('Delete: ' + err)
    );
  }

  get paragraphs() { return <FormArray>this.editBlogForm.get('paragraphs'); }
  get galleryImages() { return <FormArray>this.editBlogForm.get('galleryImages'); }

  onMainPictureSelected(path) {
    this.editBlogForm.patchValue(
      {'titlePicture': path}
    );
  }

  onPictureSelected(path, index, c: FormGroup) {
    c.patchValue({'paragraphPic': path});
  }

  onGalleryPictureSelected(path, index, c: FormGroup) {
    c.patchValue({'id': path});
  }

  onProgress(progress, index: number) {
    this.progress[index] = progress * 100;
  }

  onProgressGallery(progress, index: number) {
    this.progress_gallery[index] = progress * 100;
  }

}
