import { Component, OnInit } from '@angular/core';
import { GlobalProviderService } from '../global-provider.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  constructor(
    public gp: GlobalProviderService,

  ) { }

  

  search(t){
    console.log(t.target.value);
    let val = t.target.value;

    if(val == ""){
      this.getLocs();

      return;
    }
    else{


      this.apilocres = this.apilocres.filter(i => {
        
          return (
            i.AREA.toLowerCase().indexOf(val.toLowerCase()) > -1 
            || i.Address2.toLowerCase().indexOf(val.toLowerCase()) > -1 
            || i.CITY.toLowerCase().indexOf(val.toLowerCase()) > -1 
            || i.CustName.toLowerCase().indexOf(val.toLowerCase()) > -1 
            || i.E_MAIL.toLowerCase().indexOf(val.toLowerCase()) > -1 
            || i.LOCATION_TAG.toLowerCase().indexOf(val.toLowerCase()) > -1 
            || i.STAFF_EMAIL.toLowerCase().indexOf(val.toLowerCase()) > -1 
            || i.State.toLowerCase().indexOf(val.toLowerCase()) > -1 
            || i.UNIQUE_ID.toLowerCase().indexOf(val.toLowerCase()) > -1 
            || i.cpName1.toLowerCase().indexOf(val.toLowerCase()) > -1 
            || i.cpNo1.toLowerCase().indexOf(val.toLowerCase()) > -1 
              );
        
      });



    }



  }
  




  apilocres: any;


  edit(loc){

    this.gp.loc = loc
    this.gp.goto('addloc')

  }


  


  change(ind){
    this.apilocres[ind].open = !this.apilocres[ind].open;
  
  }


  ionViewWillEnter(){
    this.getLocs()
   
  }

  getLocs(){

    let bod = {
      id: this.gp.currentUser['Cust_ID']
    }


    this.gp.posty('getCustLocations', bod).then(res => {
      console.log('allof locs', res);
      
      this.apilocres = res;
      
      this.apilocres.map(l => l.open = false );

      console.log(this.apilocres);
      
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
    this.getLocs()
  }

}
