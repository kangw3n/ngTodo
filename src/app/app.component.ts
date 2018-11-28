import {Component, HostListener} from '@angular/core';
import {Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {

  loading = false;
  constructor(
    private router: Router,
    public authService: AuthService
  ) {
    router.events.subscribe((e: Event) => {
      this.navigationInterceptor(e);
    });
  }

  navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      console.log('navigation start');
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      console.log('navigation end');
      this.loading = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      console.log('navigation cancel');
      this.loading = false;
    }
    if (event instanceof NavigationError) {
      console.log('navigation error');
      this.loading = false;
    }
  }

  login() {
    this.authService.googleLogin();
  }

  logout() {
    this.authService.signOut();
  }
}
