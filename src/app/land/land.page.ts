import { Component, OnInit } from '@angular/core';
import { GlobalProviderService } from '../global-provider.service';

@Component({
  selector: 'app-land',
  templateUrl: './land.page.html',
  styleUrls: ['./land.page.scss'],
})
export class LandPage implements OnInit {

  constructor(
    public gp: GlobalProviderService,

  ) { }

  ionViewWillEnter() {
    setTimeout(()=>{
      this.gp.goto('/landselect');


      
    },5000);
  }
  
  
  ngOnInit() {
    setTimeout(()=>{
      this.gp.goto('/landselect');


      
    },5000);
  }

}
