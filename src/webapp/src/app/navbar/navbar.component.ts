import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild('navbar') navbar;
  sticky = false;
  show = true;
  private lastScrollPosition = 0;
  private positionTop: number;

  constructor() { }

  ngOnInit() {
    this.positionTop = this.navbar.nativeElement.offsetTop;
  }

  onScroll(data) {

    // wenn top = 0 && scroll = down => !show
    const myPageYOffset = data.target.defaultView.pageYOffset;
    if (this.navbar.nativeElement.getBoundingClientRect().top <= 0 && this.lastScrollPosition < myPageYOffset) {
      this.show = false;
    } else if (this.lastScrollPosition > myPageYOffset) {
      this.sticky = true;
      this.show = true;
    }

    if (this.navbar.nativeElement.getBoundingClientRect().top > 0) {
      this.sticky = false;
      this.show = true;
    }

    this.lastScrollPosition = myPageYOffset;
  }

}
