import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { PresentService } from 'src/app/services/present.service';
import { CategoryScale, Chart, LinearScale, LineController, LineElement, PointElement, TimeScale } from "chart.js";
//import 'chartjs-plugin-zoom'
import { records } from 'src/app/model/records';
import { DatePipe } from '@angular/common';
import  std  from "tstl";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.page.html',
  styleUrls: ['./graph.page.scss'],
})

export class GraphPage implements OnInit {
  @ViewChild('lineCanvas') lineCanvas;
  bars: any;
  lineChart: any;
  labels;
  data;
  t: String[];
  numberTraining: number;
  lnt: number[]
  map: Map<String, number>
  ldate: std.TreeSet<records>;
  constructor(private modalController: ModalController,
    private api: ApiService,
    private authS: AuthService,
    private present: PresentService,
    private datepipe: DatePipe) { }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.t = [];
    this.lnt = []
    this.labels = []
    this.ldate = new std.TreeSet<records>();
    this.map = new Map();
    let date: records[] = await this.api.getRecordsByUser(this.authS.getUser().id);
    date.forEach(element => {
      this.ldate.insert(element)
    });
    for (const element of this.ldate) {
      let d = new Date(element.localDateTime).toLocaleDateString();
      if (!this.t.includes(d)) {
        this.t.push(d)
        this.numberTraining = await this.api.getNumberOfTrainingsForDate(this.datepipe.transform(element.localDateTime, 'yyyy-MM-dd'))
        this.map.set(this.datepipe.transform(element.localDateTime, 'yyyy-MM-dd'), this.numberTraining)
      }
    }
    Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement, TimeScale);
    setTimeout(() => {
      for (let iterator of this.map.entries()) {
        this.labels.push(iterator[0])
        this.lnt.push(iterator[1])
      }
      this.lineChartMethod();
    }, 100);
  }

  public exit() {
    this.modalController.dismiss();
  }

  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Entrenamientos/Day',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
          /*  borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,*/
            data: this.lnt/*,
            spanGaps: false*/
          }
        ],
      },
       options:{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: 
            {
              stacked: true
            }
          ,
          yAxes: 
            {
              stacked: true
            }
          
       }
      },
      
    });
  }

}
