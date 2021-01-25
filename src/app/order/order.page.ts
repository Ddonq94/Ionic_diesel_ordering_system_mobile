import { Component, OnInit } from '@angular/core';
import { GlobalProviderService } from '../global-provider.service';
import * as moment from 'moment';


declare var FlutterwaveCheckout;


@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  constructor(
    public gp: GlobalProviderService,

  ) { }

  loc:any;
  vol: any = "";
  dt:any;
  // time:any;
  buttonName:any = "Submit";
  name:any = "";
  num:any = "";
  addinfo:any = "";
  pay:any = 'transfer';
  stemail:any = "";
  price:any;
  
  apiorderres:any;
  apipaidres:any;


  mo:any = moment;


  setPaid(ordID, data, source, fail = "" ){



    let bod = {

      ordID:ordID,
      data:data,
      source:source,
      fail:fail,

    }




    console.log(bod, "bod");
    // return;

    this.gp.posty('setPaid', bod).then(res => {
      console.log('allof order', res);
      
      this.apipaidres = res;
      
      // this.locs = this.apires['Response'];
      this.gp.loading.dismiss();

      if(this.apipaidres == 1){


            alert("Order Payment Successful!, We will be in touch");
            this.gp.goto("dashboard")

      
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





  makeFWPayment(amt,vol,txRef,custEmail,name) {


    let newAmt = amt/0.986;
    
    if((newAmt - amt) > 2000){
      newAmt = amt + 2000;
    }
    
    // newAmt = 100;
    
       var p = FlutterwaveCheckout({
          public_key: "FLWPUBK_TEST-a397ca52af546048dd372c2344be911b-X",
          tx_ref: txRef,
          amount: newAmt,
          currency: "NGN",
          payment_options: "card, ussd, account, banktransfer, barter ",
        //   redirect_url: // specified redirect URL
        //     "https://callbacks.piedpiper.com/flutterwave.aspx?ismobile=34",
        //   meta: {
        //     consumer_id: 23,
        //     consumer_mac: "92a3-912ba-1192a",
        //   },
          customer: {
            email: custEmail,
            // phone_number: "08102909304",
            name: name,
          },
          callback: function (data) {
            console.log(data);
            if(data.status == 'successful'){
        
              this.setPaid(txRef,JSON.stringify(data),'flutterwave');
              alert("Order Payment Successful!, We will be in touch");
        
            }
            else{
        
              this.setPaid(txRef,JSON.stringify(data),'flutterwave', 'fail');
              alert("Payment status is "+data.status+", Contact +2347057501968 for further assistance");
            }
        
        // setTimeout(function(){ location.reload(); }, 5000);
        p.close();
    
          },
          onclose: function() {
            // close modal
            console.log('closed');
        // p.close();
    
        // setTimeout(function(){ location.reload(); }, 5000);
    
          },
          customizations: {
            title: "Asharami D2D",
            description: "Payment for "+vol+"litres of Diesel",
            logo: "<?php echo base_url() ; ?>dist/mail/ashlogo1.png",
          },
        });
      }





  order(){

    if(this.sets.value != 'yes'){
      alert("Temporarily unavailable to accept orders at the moment.");
      return;
    }

    if(!this.price){
      alert("Please Select Price");
       return false;
    }
    
    if(!this.locObj){
      alert("Please Select Location");
       return false;
    }
   
    if(this.dt=="" || this.dt==undefined){
      alert("Please Select Delivery Date");
       return false;
    }
    else{
      console.log(this.mo(this.dt).format('YYYY-MM-DD HH:mm'), 'modt');

      this.dt = this.mo(this.dt).format('YYYY-MM-DD HH:mm')
    }
    
    

    if(this.vol < 200){
      alert("Please Enter Volume Above or Equal to 200 Litres");
        return false;
    }


    if(this.num != ""){

      if(isNaN(this.num)){
        alert("Please Enter Valid Phone Number or Leave Empty ");
          return false;
      }

      if(this.num.length != 9 && this.num.length != 11 ){
        alert("Please Enter Valid Phone Number or Leave Empty ");
          return false;
      }
    }


    if(this.stemail != ""){

      if(this.gp.IsEmail(this.stemail) == false){
        alert("Please Enter Valid Email Address or Leave Empty");
        return false;
      }

    }



    let nval = Math.floor(1000 + Math.random() * 9000);
    let sval = [...Array(4)].map(i=>(~~(Math.random()*36)).toString(36)).join('');

    let rand = nval+sval;

    let transAmt = parseInt(this.vol) * parseInt(this.price);



    let bod = {
      fname:this.gp.currentUser['CUSTOMER_NAME'],
      email:this.gp.currentUser['_EMAIL'],
      phnum:this.locObj['cpNo1'],
      vol:this.vol,
      address:this.locObj['Address2'],
      Location:this.locObj['AREA'],
      recName:this.name,
      recPhone:this.num,
      addInfo:this.addinfo,
      ordType:'cash',
      payMedium:this.pay,
      expectedDelivery:this.dt,
      status:"",
      price: this.price,
      staffEmail: this.stemail,
      // intOrderId:"TBD",
      // custStatus:$( "#custType" ).val(),
      custStatus:"existing",
      orderChannel:"custOrder",
      ordID: rand
    }




    console.log(bod, "bod");
    // return;

    this.gp.posty('addCustOrders', bod).then(res => {
      console.log('allof order', res);
      
      this.apiorderres = res;
      
      // this.locs = this.apires['Response'];
      this.gp.loading.dismiss();

      if(this.apiorderres == 1){


            if(this.pay == "flutterwave"){
              this.makeFWPayment(transAmt, parseInt(this.vol),rand,bod.email,bod.fname);
        
            }
            else if(this.pay == "gtpay"){
              //ACTUAL
              // window.location.href = "<?php echo base_url() ; ?>index.php/paytest/"+rand+"/"+transAmt+"";
            //  ====================================
              // window.location.href = "<?php echo base_url() ; ?>index.php/paytest/"+rand+"/"+100+"";
              // makeGTPayment(5000, 200,rand,email,fname);
              // window.open("<?php echo base_url() ; ?>index.php/paytest/"+rand+"/"+transAmt+"");
              // window.open("<?php echo base_url() ; ?>index.php/paytest/"+rand+"/"+100+"");
            }
            else{
        
            alert("Order Recorded Successfully! Please Check your Email for Payment Details");
            this.gp.goto("dashboard")
            
            // setTimeout(function(){ location.reload(); }, 5000);
        
            }

      
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


  defPrice: any;
  
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




  apisetres: any;

  apires: any;

  prices: any;
  locs: any;
  sets: any;


  getSets(){

    
    this.gp.posty('getsets', {}).then(res => {
      console.log('allof sets', res);
      
      this.apisetres = res;
      
      this.sets = this.apisetres.find(element => element.skey == 'custord'); 

      console.log(this.sets, 'cust');

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

    this.getSets();
    this.getPrice();
    this.getLocs();

  }

}
