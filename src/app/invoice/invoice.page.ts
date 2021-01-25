import { Component, OnInit } from '@angular/core';
import { GlobalProviderService } from '../global-provider.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
})
export class InvoicePage implements OnInit {

  constructor(
    public gp: GlobalProviderService,

  ) { }

  loc:any;
  vol:any = "";
  inv:any = 'PRO FORMA INVOICE';


  apiinvres: any;

  generate(){

    if(!this.price){
      alert("Please Select Price");
       return false;
    }
    
    if(!this.locObj){
      alert("Please Select Location");
       return false;
    }

    if(this.vol < 200){
      alert("Please Enter Volume Above or Equal to 200 Litres");
        return false;
    }



    let bod = {
      invType:this.inv,
      custName:this.gp.currentUser['CUSTOMER_NAME'],
      locName:this.locObj['Address2'],
      vol:this.vol,
      price: this.price,
    }

    //generate inv here

    console.log(bod, "bod");
    // return;

    this.gp.posty('invoiceGen', bod).then(res => {
      console.log('allof inv', res);
      
      this.apiinvres = res;
      
      // this.locs = this.apires['Response'];
      this.gp.loading.dismiss();

      if(this.apiinvres.res == 1){


        alert("Success!, Invoice Will be Generated Shortly!");

        this.link = `${this.gp.baseUrl}${this.apiinvres.urlPath}`

        console.log('link', this.link)
      
      }
      else{
        alert("Something went wrong, Please contact Admin");
      }
      // this.gp.goto('/dashboard');
      

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


  download(){}




  locObj: any;

  setLoc(ev){
    console.log("ev",ev);
    let ind = ev.detail.value;
    console.log(ind,'ind');
   
    if(ind == "new"){
      this.gp.goto('location')
      return;
    }

    ind = parseInt(ind);

    this.locObj = this.locs[ind];
    // this.loc = this.locs[ind].location;

  }






  apilocres: any;


  getLocs(){

    let bod = {
      id: this.gp.currentUser['Cust_ID']
    }


    this.gp.posty('getCustLocations', bod).then(res => {
      console.log('allof locs', res);
      
      this.apilocres = res;
      
      this.locs = this.apilocres;
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

  price:any;

  defPrice: any;

  prices: any;
  locs: any;
  link: any;
  
  apipriceres: any;

  getPrice(){

    
    this.gp.posty('d2dPrice', {}).then(res => {
      console.log('allof them', res);
      
      this.apipriceres = res;
      
      this.prices = this.apipriceres['Response'];

      this.defPrice = this.prices.find(element => element.location == 'Lagos'); 

      this.price = this.defPrice.price;

      console.log(this.defPrice,'defp');

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
    this.getPrice();
    this.getLocs();
  }

}
