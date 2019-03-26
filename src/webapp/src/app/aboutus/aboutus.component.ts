import {Component, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {

  public baseUrl = environment.urlBase;

  constructor() {}

  ngOnInit() {}


}
