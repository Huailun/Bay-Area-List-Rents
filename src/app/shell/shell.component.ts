import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {
  pageTitle = 'Bay Area List Rents'
  constructor(public appService: AppService, private router: Router) { }

  ngOnInit(): void {
  }
  
  logout() {
    this.appService.username = '';
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

}
