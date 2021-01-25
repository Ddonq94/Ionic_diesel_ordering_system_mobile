import { Component, OnInit } from '@angular/core';
import { GlobalProviderService } from '../global-provider.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    public gp: GlobalProviderService,

  ) { }

  name:any = this.gp.currentUser['CUSTOMER_NAME'];
  phone:any = this.gp.currentUser['basePhone'];
  pass:any = "";
  cpass:any = "";



  save(){


    if(this.name == "" || this.name.length == 0){
      alert("Please Enter Full Name");
       return false;
    }

    if(isNaN(this.phone)){
      alert("Please Enter Valid Phone Number  ");
        return false;
    }

    if(this.phone.length != 9 && this.phone.length != 11 ){
      alert("Please Enter Valid Phone Number ");
        return false;
    }


    let bod = {
      
      CUSTOMER_NAME:this.name,
      basePhone:this.phone,
      id: this.gp.currentUser['Cust_ID']
    }

    //generate inv here

    console.log(bod, "bod");
    // return;

    this.gp.posty('editCustUser', bod).then(res => {
      console.log('allof cust', res);
      
      this.apires = res;
      
      // this.locs = this.apires['Response'];
      this.gp.loading.dismiss();

      if(this.apires){


        alert("Success!, Update Successful!");
        alert("Logging Out Now For Changes to Take Effect");

        this.gp.goto('/login');
      
      }
      else{
        alert("Something went wrong, Please contact Admin");
      }
      

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




  apires:any;
  apipassres:any;

  savepw(){

    if (this.pass == ""){
      alert("Passwords Can Not be Empty");
    return;
    }
    
    if (this.pass.length < 7 ){
      alert("Passwords Must Exceed 6 Characters ");
    return;
    }

    if (this.pass != this.cpass){
      alert("Passwords Do Not Match");
      return;
      }
      
      


    let bod = {
      
      password: this.pass,
    }

    //generate inv here

    console.log(bod, "bod");
    // return;

    this.gp.posty('changeCustPassword/'+this.gp.currentUser['Cust_ID'], bod).then(res => {
      console.log('allof pass', res);
      
      this.apipassres = res;
      
      // this.locs = this.apires['Response'];
      this.gp.loading.dismiss();

      if(this.apipassres == 1){


        alert("Success!, Password Updated Successfully!");
        alert("Logging Out Now For Changes to Take Effect");

        this.gp.goto('/login');
      
      }
      else{
        alert("Something went wrong, Please contact Admin");
      }
      

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
  }

}
