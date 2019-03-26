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
  @ViewChild(NgxImageGalleryComponent) ngxImageGallery: NgxImageGalleryComponent;
  @HostListener('document:click', ['$event']) clickedOutside($event){
    // here you can hide your menu
    console.log("CLICKED OUTSIDE");
  }
  public basePath = environment.urlBase;


  // gallery configuration
  conf: GALLERY_CONF = {
    imageOffset: '0px',
    showDeleteControl: false,
    showImageTitle: false,
 /*   inline: true*/
  };

  // gallery images
  images: GALLERY_IMAGE[] = [];/* = [
    {
      url: this.myBlog.titlePicture,
      altText: 'woman-in-black-blazer-holding-blue-cup',
      title: 'woman-in-black-blazer-holding-blue-cup',
      thumbnailUrl: "https://images.pexels.com/photos/669013/pexels-photo-669013.jpeg?w=60"
    },
    {
      url: this.myBlog.paragraphs[0].paragraphPic,
      altText: 'two-woman-standing-on-the-ground-and-staring-at-the-mountain',
      extUrl: 'https://www.pexels.com/photo/two-woman-standing-on-the-ground-and-staring-at-the-mountain-669006/',
      thumbnailUrl: "https://images.pexels.com/photos/669006/pexels-photo-669006.jpeg?w=60"
    },
  ];*/

  constructor(private router: Router, private activeRoute: ActivatedRoute, private blogService: BlogService) { }

  ngOnInit() {
    this.images.push({url: this.basePath + '/api/file-upload/' + this.myBlog.titlePicture});
    this.myBlog.paragraphs.forEach((p) => {
      this.images.push({url: this.basePath + '/api/file-upload/' + p.paragraphPic});
    });
  }

  onDelete() {
    this.blogService.delete(this.myBlog._id).subscribe(
      (next) => console.log(next),
      (err) => console.log(err)
    );
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
