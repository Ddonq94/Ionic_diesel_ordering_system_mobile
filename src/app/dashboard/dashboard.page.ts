import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GlobalProviderService } from '../global-provider.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild("barCanvas") barCanvas: ElementRef;

  constructor(
    public gp: GlobalProviderService,

  ) { }


  sliderConfig = {
    slidesPerView: 2.7,
    spaceBetween: 0.1,
    // centeredSlides: true
  };

  
  apiordres:any;



  private barChart: Chart;



  getOrds(){

    let bod = {
      name: this.gp.currentUser['name'],
      email: this.gp.currentUser['email'],
      count: 5
    }


    this.gp.posty('lastcustOrder_ajax', bod).then(res => {
      console.log('allof ords', res);
      
      this.apiordres = res;
      
      this.apiordres.map(l => l.amt = parseInt(l.price) * parseInt(l.vol) );

      console.log(this.apiordres);
      
      this.gp.loading.dismiss();


      if(this.apiordres.length > 0){

      // =========================================
      let data = this.apiordres.map(l => parseInt(l.vol) );
      let labels = this.apiordres.map(l => l.created.substring(0, 10) );

      
      this.barChart = new Chart(this.barCanvas.nativeElement, {
        type: "bar",
        data: {
          // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          labels: labels,
          datasets: [
            {
              label: "Last 5 Orders (Ltrs)",
              data: data,
              // data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
              ],
              borderColor: [
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)"
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          },

          tooltips: {
            callbacks: {
                label: (tooltipItem, data) => {

                    let label = data.labels[tooltipItem.index];
                    let value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    return ' ' + label + ': ' + this.gp.numberWithCommas(value) ;

                }
            }
        }


        }
      });
      
      // =========================================
    }


      

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


  ionViewWillEnter(){
    if(!this.gp.currentUser){
      this.gp.goto('login');
    }

    this.getOrds()
  }


  ngOnInit() {


    if(!this.gp.currentUser){
      this.gp.goto('login');
    }

    this.getOrds()


  }

}
