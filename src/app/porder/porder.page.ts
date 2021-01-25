import { Component, OnInit } from '@angular/core';
import { GlobalProviderService } from '../global-provider.service';

@Component({
  selector: 'app-porder',
  templateUrl: './porder.page.html',
  styleUrls: ['./porder.page.scss'],
})
export class PorderPage implements OnInit {

  constructor(
    public gp: GlobalProviderService,

  ) { }

  search(t){
    console.log(t.target.value);
    let val = t.target.value;

    if(val == ""){
      this.getOrds();

      return;
    }
    else{


      this.apiordres = this.apiordres.filter(i => {

        console.log(i);
        
          return (
            ( i.addInfo != null &&  i.addInfo.toLowerCase().indexOf(val.toLowerCase()) > -1 )
            || i.address.toLowerCase().indexOf(val.toLowerCase()) > -1 
            || i.created.toLowerCase().indexOf(val.toLowerCase()) > -1 
            || i.fname.toLowerCase().indexOf(val.toLowerCase()) > -1 
            || i.intVol.toLowerCase().indexOf(val.toLowerCase()) > -1 
            || i.location.toLowerCase().indexOf(val.toLowerCase()) > -1 
            || i.price.toLowerCase().indexOf(val.toLowerCase()) > -1 
            || i.recName.toLowerCase().indexOf(val.toLowerCase()) > -1 
            || i.recPhone.toLowerCase().indexOf(val.toLowerCase()) > -1 
            || (i.staffEmail != null && i.staffEmail.toLowerCase().indexOf(val.toLowerCase()) > -1 )
            || i.status.toLowerCase().indexOf(val.toLowerCase()) > -1 
            || i.vol.toLowerCase().indexOf(val.toLowerCase()) > -1 
            || i.amt.toString().toLowerCase().indexOf(val.toLowerCase()) > -1 
              );
        
      });



    }



  }


  change(ind){
    this.apiordres[ind].open = !this.apiordres[ind].open;
  
  }


  apiordres:any;

  getOrds(){

    let bod = {
      name: this.gp.currentUser['name'],
      email: this.gp.currentUser['email']
    }


    this.gp.posty('custOrders_loadtable_ajax', bod).then(res => {
      console.log('allof ords', res);
      
      this.apiordres = res;
      
      this.apiordres.map(l => l.open = false );
      this.apiordres.map(l => l.amt = parseInt(l.price) * parseInt(l.vol) );

      console.log(this.apiordres);
      
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
    this.getOrds()
  }

}
