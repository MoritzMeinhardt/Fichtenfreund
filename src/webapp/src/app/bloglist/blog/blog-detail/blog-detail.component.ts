import {Component, HostListener, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Blog} from "../blog.model";
import {ActivatedRoute, Params} from "@angular/router";
import {BlogService} from "../../../shared/blog.service";
import {environment} from "../../../../environments/environment";
import {GALLERY_CONF, GALLERY_IMAGE, NgxImageGalleryComponent} from "ngx-image-gallery";

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  providers: []
})
export class BlogDetailComponent implements OnInit, OnDestroy {

  @Input() myBlog: Blog;

  @ViewChild(NgxImageGalleryComponent) ngxImageGallery: NgxImageGalleryComponent;
  @HostListener('document:click', ['$event']) clickedOutside($event){
    // here you can hide your menu
    console.log("CLICKED OUTSIDE");
  };

  // gallery configuration
  conf: GALLERY_CONF = {
    imageOffset: '0px',
    showDeleteControl: false,
    showImageTitle: false,
    /*   inline: true*/
  };

  // gallery images
  images: GALLERY_IMAGE[] = [];

  private id: string;
  public baseUrl = environment.urlBase;

  constructor(private route: ActivatedRoute,
              private blogService: BlogService) { }

  ngOnInit() {

    console.log(this.myBlog);

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

              this.images.push({url: this.baseUrl + '/api/file-upload/' + this.myBlog.titlePicture});
              this.myBlog.paragraphs.forEach((p) => {
                this.images.push({url: this.baseUrl + '/api/file-upload/' + p.paragraphPic});
              });
            }
          );
        }
      )
    }
  }

  ngOnDestroy() {
    this.blogService.onChangedDetail.next();
  }



  // METHODS
  // open gallery
  openGallery(index: number = 0) {
    this.ngxImageGallery.open(index);
  }

  // close gallery
  closeGallery() {
    this.ngxImageGallery.close();
  }

  // set new active(visible) image in gallery
  newImage(index: number = 0) {
    this.ngxImageGallery.setActiveImage(index);
  }

  // next image in gallery
  nextImage(index: number = 0) {
    this.ngxImageGallery.next();
  }

  // prev image in gallery
  prevImage(index: number = 0) {
    this.ngxImageGallery.prev();
  }

  /**************************************************/

  // EVENTS
  // callback on gallery opened
  galleryOpened(index) {
    console.info('Gallery opened at index ', index);
  }

  // callback on gallery closed
  galleryClosed() {
    console.info('Gallery closed.');
  }

  clickInside(event) {
    event.preventDefault();
    console.log(event);
    event.stopPropagation();  // <- that will stop propagation on lower layers
    console.log("CLICKED INSIDE, MENU WON'T HIDE");
  }

  // callback on gallery image clicked
  galleryImageClicked(index) {
    console.info('Gallery image clicked with index ', index);
  }

  // callback on gallery image changed
  galleryImageChanged(index) {
    console.info('Gallery image changed to index ', index);
  }

  // callback on user clicked delete button
  deleteImage(index) {
    console.info('Delete image at index ', index);
  }
}
