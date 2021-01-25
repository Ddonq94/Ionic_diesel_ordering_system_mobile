import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GlobalProviderService } from './global-provider.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    // {
    //   title: 'Inbox',
    //   url: '/folder/Inbox',
    //   icon: 'mail'
    // },
    // {
    //   title: 'Land',
    //   url: '/land',
    //   icon: 'paper-plane'
    // },
    // {
    //   title: 'su',
    //   url: '/signup',
    //   icon: 'paper-plane'
    // },
    // {
    //   title: 'Login',
    //   url: '/login',
    //   icon: 'paper-plane'
    // },
    {
      title: 'Home',
      url: '/dashboard',
      icon: 'home'
    },
    {
      title: 'Place New Order',
      url: '/order',
      icon: 'cart'
    },
    {
      title: 'Generate Invoice',
      url: '/invoice',
      icon: 'newspaper'
    },
    {
      title: 'My Locations',
      url: '/location',
      icon: 'location'
    },
    {
      title: 'My Past Orders',
      url: '/porder',
      icon: 'time'
    },
    {
      title: 'My Payments',
      url: '/payment',
      icon: 'wallet'
    },
    {
      title: 'My Profile',
      url: '/profile',
      icon: 'person'
    },
    {
      title: 'Logout',
      url: '/login',
      icon: 'log-out'
    },
    // {
    //   title: 'Trash',
    //   url: '/folder/Trash',
    //   icon: 'trash'
    // },
    // {
    //   title: 'Spam',
    //   url: '/folder/Spam',
    //   icon: 'warning'
    // }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    public gp: GlobalProviderService,
    private statusBar: StatusBar,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#EC601A');

      // this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
