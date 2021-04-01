import { Component, OnInit } from '@angular/core';
import { GlobalProviderService } from '../global-provider.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(
    public gp: GlobalProviderService,

  ) { }

  fname: any = "";
  email: any = "";
  phnum: any = ""  ;
  vol: any = "";
  address: any  = "";
  price: any
  loc: any


  setLocPrice(ev){
    console.log("ev",ev);
    let ind = parseInt(ev.detail.value);
    console.log(ind,'ind');
    
    this.price = this.locs[ind].price;
    this.loc = this.locs[ind].location;

  }


  signup(){


    if(this.fname == "" || this.fname.length == 0){
      alert("Please Enter Full Name");
       return false;
    }
    

    if(isNaN(this.phnum)){
      alert("Please Enter Valid Phone Number ");
        return false;
    }


    if(this.phnum.length != 9 && this.phnum.length != 11 ){
      alert("Please Enter Valid Phone Number ");
        return false;
    }


    if(this.gp.IsEmail(this.email) == false){
      alert("Please Enter Valid Email Address");
      return false;
    }
    
  
  
    if(this.vol < 200){
      alert("Please Enter Volume Above or Equal to 200Litres");
        return false;
    }
    
    if(this.address==""){
      alert("Please Enter Full Delivery Address ");
       return false;
    }
   
    if(this.loc==""){
      alert("Please Select Location");
       return false;
    }




    let bod = {
      fname:this.fname,
			email:this.email,
			phnum:this.phnum,
			vol:this.vol,
      address:this.address,
      price:this.price,
      location:this.loc
    }

    console.log(bod, "bod");
    // return;

    this.gp.posty('d2dCustOrder', bod).then(res => {
      console.log('allof them', res);
      
      this.apires = res;
      
      // this.locs = this.apires['Response'];
      this.gp.loading.dismiss();

      if(this.apires == 1){

        alert('Dear Customer, your order has been placed successfully and the details sent to your email. Please proceed to your email to confirm purchase and make payment.');
      }
      else if(this.apires == 2){
        alert("There is an account with this email already, please login instead");
      }
      else{
        alert("Something went wrong, Please contact Admin");
      }
      // this.gp.goto('/dashboard');
      

    },
    err => {
      console.log(err);
      alert("Something went wrong, Please contact Admin");
      // this.gp.loading.dismiss();


    })
    .catch(err => {
      console.log(err);
      alert("Something went wrong, Please contact Admin");
      console.log('err');
      // this.gp.loading.dismiss();


    });

  }


apires: any;

locs: any;

  getPrice(){

    
    this.gp.posty('d2dPrice', {}).then(res => {
      console.log('allof them', res);
      
      this.apires = res;
      
      this.locs = this.apires['Response'];
      this.gp.loading.dismiss();

      // alert('Contact edited successfully!');
      

    },
    err => {
      console.log(err);
      alert("Something went wrong, Please contact Admin");
      // this.gp.loading.dismiss();


    })
    .catch(err => {
      console.log(err);
      alert("Something went wrong, Please contact Admin");
      console.log('err');
      // this.gp.loading.dismiss();


    });


  }
  




  ngOnInit() {

    this.getPrice();

  }

}
