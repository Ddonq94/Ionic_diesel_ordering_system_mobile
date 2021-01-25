import { Component, OnInit } from '@angular/core';
import { GlobalProviderService } from '../global-provider.service';

@Component({
  selector: 'app-landselect',
  templateUrl: './landselect.page.html',
  styleUrls: ['./landselect.page.scss'],
})
export class LandselectPage implements OnInit {

  constructor(
    public gp: GlobalProviderService,

  ) { }


  signup(){
    this.gp.goto('/signup');
    
  }

  login(){

    this.gp.goto('/login');


  }

  ngOnInit() {
  }

}
