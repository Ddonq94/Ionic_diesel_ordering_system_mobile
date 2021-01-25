import { Component, OnInit } from '@angular/core';
import { GlobalProviderService } from '../global-provider.service';

@Component({
  selector: 'app-addloc',
  templateUrl: './addloc.page.html',
  styleUrls: ['./addloc.page.scss'],
})
export class AddlocPage implements OnInit {

  constructor(
    public gp: GlobalProviderService,

  ) { }


  mgt;



  ionViewWillLeave(){
    this.gp.loc = null
  }


  addy: any  = "";
  area: any  = "";
  email:any = "";
  stemail:any = "";
  city:any = "";
  name:any = "";
  num:any = "";
  state:any = "";




  setCity(ev){
    console.log("ev",ev);
    let ind = ev.detail.value;
    console.log(ind,'ind');
   
    ind = parseInt(ind);

    this.city = this.apires[ind].City;
    this.state = this.apires[ind].State;
    // this.loc = this.locs[ind].location;

  }


  apires: any
  apilocres: any

  getCitys(){

    let bod = {
      
    }



    this.gp.posty('getCitys', bod).then(res => {
      console.log('allof cities', res);
      
      this.apires = res;

      this.apires.sort((a, b) =>
      {
        let x = a['City']; 
        let y = b['City'];
        
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      
      });
      
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


  submit(){


    // if(isNaN(this.num)){
    //   alert("Please Enter Valid Phone Number or Leave Empty ");
    //     return false;
    // }

    // if(this.num.length != 9 && this.num.length != 11 ){
    //   alert("Please Enter Valid Phone Number or Leave Empty ");
    //     return false;
    // }



    if(this.addy == ""){
			alert("Invalid Location Address");
			return;
		}
	
		if(this.area == ""){
			alert("Invalid Location Area");
			return;
		}
		
		if(this.city == "" || this.city == null){
			alert("Invalid Location City");
			return;
		}
	
		if(this.name == ""){
			alert("Valid Contact Person Name is Required");
			return;
		}
		
		// if($( "#lcpnum1" ).val() == ""){
		if(this.num.length != 9 && this.num.length != 11 ){
	
			alert("Valid Contact Person Number is Required");
			return;
		}
		
		if(!this.gp.IsEmail(this.email)){
			alert("Invalid Location Email");
			return;
		}


    if(this.stemail != "" && this.stemail != null){

      if(this.gp.IsEmail(this.stemail) == false){
        alert("Please Enter Valid Email Address or Leave Empty");
        return false;
      }

    }


    let bod = {
      Address2:this.addy,
      AREA: this.area,
      CITY: this.city,
    
      cpName1: this.name,
      cpNo1:this.num,
    
      cpName2:"",
      cpNo2:"",
    
      cpName3:"",
      cpNo3:"",
    
      E_MAIL:this.email,
      STAFF_EMAIL:this.stemail,
    
      ACTIVE:"YES",
      State:this.state,
      
      Cust_ID:this.gp.currentUser['Cust_ID'],
    
    UNIQUE_ID:this.addy.substring(0,15),
    CustName:this.gp.currentUser['CUSTOMER_NAME'],
    
    LOCATION_TAG:"D2D - "+ this.gp.currentUser['CUSTOMER_NAME'] + " --- "+ this.area + "(" +this.area.substring(0,15)+")",
    
    CustCategory:"D2D",
    
    }


    
    let endpoint = ""
    let alerter = ""
    if(this.mgt == "Edit"){
      bod["LiD"] = this.gp.loc.LiD
      endpoint = 'editLocation'
      alerter = "Edited"
    }
    else{
      endpoint = 'addLocation'
      alerter = "Added"
      
    }
    
    // return;
    console.log("bod",bod)
    console.log(endpoint)

    this.gp.posty(endpoint, bod).then(res => {
      console.log('allof locs', res);
      
      this.apilocres = res;
      
      console.log(this.apilocres);
      
      this.gp.loading.dismiss();

      if(this.apilocres == 1){
        alert("Success! Location "+alerter+" Successfully!");

        this.gp.goto("location")
      
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

    this.getCitys();

    console.log(this.gp.loc)
    if(this.gp.loc){
      this.mgt = "Edit"

      this.addy = this.gp.loc.Address2
      this.area = this.gp.loc.AREA
      this.email = this.gp.loc.E_MAIL
      this.stemail = this.gp.loc.STAFF_EMAIL
      this.city = this.gp.loc.CITY
      this.name = this.gp.loc.cpName1
      this.num = this.gp.loc.cpNo1
      this.state = this.gp.loc.State


    }
    else{
      this.mgt = "Add"
    }

  }

}
