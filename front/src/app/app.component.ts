import { Component } from '@angular/core';
import { Router, Event as RouterEvent, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'webE-commerce';
  showSidebar: boolean = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showSidebar = !['/login', '/signin', '/home'].includes(event.urlAfterRedirects);
    });
  }

  sidebarCollapsed = false;

  handleSidebarState(isCollapsed: boolean): void {
    this.sidebarCollapsed = isCollapsed;
    // Additional logic can be added here if needed.
  }

  

  
}
