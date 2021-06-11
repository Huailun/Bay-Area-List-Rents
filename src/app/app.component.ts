import { Component, OnInit } from '@angular/core';

import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rent-list-bayarea';

  constructor(private appService: AppService) {
  }

  ngOnInit(): void {
    if (!this.appService.username || this.appService.username.length < 1) {
      this.appService.setUsername(localStorage.getItem('username'));
    }
  }

}