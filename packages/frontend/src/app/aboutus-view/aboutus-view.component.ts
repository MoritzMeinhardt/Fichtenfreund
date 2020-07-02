import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-aboutus-view',
  templateUrl: './aboutus-view.component.html',
  styleUrls: ['./aboutus-view.component.scss']
})
export class AboutusViewComponent implements OnInit {

  public baseUrl = environment.urlBase;
  constructor() { }

  ngOnInit() {
  }

}
