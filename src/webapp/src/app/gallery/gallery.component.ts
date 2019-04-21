import {Component, Input, OnInit, Renderer2} from '@angular/core';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  @Input() images: {url: string} [];
  public showOverlay = false;
  public index = 0;
  public interval = 3000;
  public baseUrl = environment.urlBase;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {}

  onImageClicked(imgNo: number) {
    this.interval = 1000000000;
    this.renderer.addClass(document.body, 'modal-open');
    this.showOverlay = true;
    this.index = imgNo;
  }

  onLeft() {
    if (this.index > 0 ) {
      this.index--;
    } else {
      this.index = this.images.length - 1;
    }
  }

  onRight() {
    if (this.index < this.images.length - 1) {
      this.index++;
    } else {
      this.index = 0;
    }
  }

  onClose() {
    this.showOverlay = false;
    this.renderer.removeClass(document.body, 'modal-open');
    this.interval = 3000;
  }

}
