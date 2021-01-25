import { Component, OnInit } from '@angular/core';
import { GlobalProviderService } from '../global-provider.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public gp: GlobalProviderService,
    private storage: Storage,
    public alertController: AlertController
  ) { }


  email: any = "";
  pw: any = "";

  loginEmail: any = "";



  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Get New Password!',
      inputs: [
        {
          name: 'loginEmail',
          type: 'email',
          placeholder: 'Your Account Email'
        },
        
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.loginEmail = data.loginEmail;
            console.log(this.loginEmail);
            this.forgotPW();
          }
        }
      ]
    });

    await alert.present();
  }

  

  forgotPW(){
    // 

    if(this.gp.IsEmail(this.loginEmail) == false){
      alert("Please Enter Valid Email Address");
      return false;
    }

    let bod = {
			loginEmail:this.loginEmail,
      
    }

    this.gp.posty('forgotPW', bod).then(res => {
      console.log('allof them', res);
      
      this.apires = res;
      
      // this.locs = this.apires['Response'];
      this.gp.loading.dismiss();

      if(this.apires == 1){

        alert('Dear Customer, your Password has been reset. Please proceed to your email to continue.');
      }
      else if(this.apires == 2){
        alert("There is no account registered to this email, Try signing up or contact Admin!");
      }
      
      else{
        alert("Something went wrong, Please try again or contact Admin");
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


apires: any;


  login(){

    if(this.gp.IsEmail(this.email) == false){
      alert("Please Enter Valid Email Address");
      return false;
    }

    if(this.pw == "" || this.pw.length == 0){
      alert("Please Enter Your Password");
       return false;
    }

    let bod = {
			email:this.email,
      pw:this.pw,
			
    }

    console.log(bod, "bod");
    // return;

    this.gp.posty('custlogin_submit_ajax', bod).then(res => {
      console.log('allof them', res);
      
      this.apires = res;
      if(this.apires.length >= 1){
        // this.storage.set('userdt', this.apires[0]);
        this.gp.currentUser = this.apires[0];
        this.gp.goto('/dashboard');

      }else{
        alert("Something went wrong, Please try again or contact Admin");
      }
      // this.locs = this.apires['Response'];
      this.gp.loading.dismiss();

      
      

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
  
    this.gp.currentUser = null;
  
  }

}
