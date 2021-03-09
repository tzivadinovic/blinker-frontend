import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {menu} from '../utils/pageMenuItems';
import {Router} from '@angular/router';
import {AuthenticationService} from '../utils/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;
  title = 'blinker-frontend';
  menuItems: IMenuItem[];
  opened: boolean;

  ngDoCheck(): void {
    if (window.location.pathname === '/' || window.innerWidth < 600) {
      this.opened = false;

    } else {
      this.opened = true;
      this.menuItems = menu;
    }
  }

  constructor(private router: Router,
              private authService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
  }
}
