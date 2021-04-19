import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { PresentService } from 'src/app/services/present.service';
import { ArcElement, BarController, BarElement, BubbleController, CategoryScale, Chart, DoughnutController, Filler, Legend, LinearScale, LineController, LineElement, LogarithmicScale, PieController, PointElement, PolarAreaController, RadarController, RadialLinearScale, ScatterController, TimeScale, TimeSeriesScale, Title, Tooltip } from "chart.js";
//import 'chartjs-plugin-zoom'
import { records } from 'src/app/model/records';
import { DatePipe } from '@angular/common';
import std, { TreeSet } from "tstl";
import { ReverseIterator } from 'tstl/internal/iterator/ReverseIterator';

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
  ldate: std.HashSet<records>;
  constructor(private modalController: ModalController,
    private api: ApiService,
    private authS: AuthService,
    private present: PresentService,
    private datepipe: DatePipe) { }

  ngOnInit() {
    Chart.register(ArcElement,
      LineElement,
      BarElement,
      PointElement,
      BarController,
      BubbleController,
      DoughnutController,
      LineController,
      PieController,
      PolarAreaController,
      RadarController,
      ScatterController,
      CategoryScale,
      LinearScale,
      LogarithmicScale,
      RadialLinearScale,
      TimeScale,
      TimeSeriesScale,
      Filler,
      Legend,
      Title,
      Tooltip);

  }

  async ionViewDidEnter() {
    this.t = [];
    this.lnt = []
    this.labels = []
    this.ldate = new std.HashSet<records>();
    this.map = new Map();
    let arr: records[] = []
    let date: records[] = await this.api.getLastSevenRecordsByIdUser(this.authS.getUser().id);
    date.forEach(element => {
      this.ldate.insert(element)
    });
    arr = this.ldate.toJSON()
    for (const element of arr.reverse()) {
      let d = new Date(element.localDateTime).toLocaleDateString();
      if (!this.t.includes(d)) {
        this.t.push(d)
        this.numberTraining = await this.api.getNumberOfTrainingsForDate(this.datepipe.transform(element.localDateTime, 'yyyy-MM-dd'),this.authS.getUser().id)
        this.map.set(this.datepipe.transform(element.localDateTime, 'yyyy-MM-dd'), this.numberTraining)
      }
    }
    for (let iterator of this.map.entries()) {
      this.labels.push(iterator[0])
      this.lnt.push(iterator[1])
    }
    this.lineChartMethod();
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
            label: 'Entrenamientos/Día',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: '#2EB1C8',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#2E6FC8',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 2.5,
            pointHitRadius: 10,
            data: this.lnt,
            spanGaps: false
          }
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes:
          {
            beginAtZero: true,
            ticks: {
              autoSkip: false
            }
         },
          yAxes:
          {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            },
            stacked: true
          }

        }
      },

    });
  }

}
