import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class GlobalProviderService {

  constructor(
    public router: Router,
    private http: HTTP,
    public loadingController: LoadingController


  ) { }


  baseUrl: string = "https://app05.sahara-group.com/adstest/";


  goto(loc){
    this.router.navigate([loc]);

  }


  currentUser;


  IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(!regex.test(email)) {
      return false;
    }else{
      return true;
    }
  }


  loading;

    // // ==========================load====================================
    async presentLoading() {
      
      this.loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Hold on...',
        duration: 2000
      });

      await this.loading.present();
  
      const { role, data } = await this.loading.onDidDismiss();
      console.log('Loading dismissed!');
    }
    // // ==========================load====================================


  httpOptions = {
    // 'Accept':  'application/json',
    'Content-Type':  'application/json'
  };


  head(){
    
    return this.httpOptions;

  }

  capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  posty(node, obj){

    this.presentLoading();


    return this.http.post(`${this.baseUrl}${node}`, obj, this.head())
    // .toPromise()
    .then(res => {
        console.log(res);

        // this.loading.dismiss();

        return JSON.parse(res.data);
    });


  }


loc: any = null


}
