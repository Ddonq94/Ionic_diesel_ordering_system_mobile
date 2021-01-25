import { Component, OnInit } from '@angular/core';
import { GlobalProviderService } from '../global-provider.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(
    public gp: GlobalProviderService,

  ) { }

  ngOnInit() {


    if(!this.gp.currentUser){
      this.gp.goto('login');
    }

  }

}
