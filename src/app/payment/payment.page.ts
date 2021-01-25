import { Component, OnInit } from '@angular/core';
import { GlobalProviderService } from '../global-provider.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  constructor(
    public gp: GlobalProviderService,

  ) { }





  search(t){
    console.log(t.target.value);
    let val = t.target.value;

    if(val == ""){
      this.getPays();

      return;
    }
    else{


      this.apires = this.apires.filter(i => {

        console.log(i);
        
          return (
             i.source.toLowerCase().indexOf(val.toLowerCase()) > -1 
             || i.vol.toLowerCase().indexOf(val.toLowerCase()) > -1 
             || i.amt.toString().toLowerCase().indexOf(val.toLowerCase()) > -1 
             || i.price.toLowerCase().indexOf(val.toLowerCase()) > -1 
             || i.email.toLowerCase().indexOf(val.toLowerCase()) > -1 
             || i.resObj.status.toLowerCase().indexOf(val.toLowerCase()) > -1 
             || i.created.toLowerCase().indexOf(val.toLowerCase()) > -1 

              );
        
      });



    }



  }


  change(ind){
    this.apires[ind].open = !this.apires[ind].open;
  
  }


  apires:any;

  getPays(){

    let bod = {
      
      email: this.gp.currentUser['email']
    }


    this.gp.posty('custpayments_loadtable_ajax', bod).then(res => {
      console.log('allof pays', res);
      
      this.apires = res;
      
      this.apires.map(l => l.open = false );
      this.apires.map(l => l.amt = parseInt(l.price) * parseInt(l.vol) );
      this.apires.map(l => l.resObj = JSON.parse(l.resObj) );

      console.log(this.apires);
      
      this.gp.loading.dismiss();

      // alert('Contact edited successfully!');
      

    },
    err => {
      console.log(err);
      // this.gp.loading.dismiss();


    })
    .catch(err => {
      console.log(err);
      console.log('err');
      // this.gp.loading.dismiss();


    });


  }




  ngOnInit() {
    this.getPays()
  }


}
