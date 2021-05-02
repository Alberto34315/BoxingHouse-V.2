import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { BehaviorSubject } from 'rxjs';
import { exercise } from '../model/exercise';
import { training } from '../model/training';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: 'root'
})
export class PdfService {
  me;
  se;
  text;
  text2;
  mbt;
  sbt;
  timeout;
  interval;
  logo;
  m;
  s;
  timeExer: BehaviorSubject<string> = new BehaviorSubject("00:00");
  pdfObj = null;
  constructor(private http: HttpClient, 
    private plt: Platform,
     private file: File,
     private fileOp:FileOpener) {
    this.http.get("../../assets/imgs/logoPDF.json").subscribe(result => {
      this.logo = result
    })
  }

  createPdf(training?: training, btime?: BehaviorSubject<string>) {
    var docDefinition = {
      content: [
        {
          image: this.logo.logo
          , width: 75,
          height: 75
        },
        { text: new Date().toTimeString(), alignment: 'right' },

        { text: 'Training', style: 'subheader' },
        { text: training.title, margin: [0, 0, 0, 0] },

        { text: 'Rest between exercises', style: 'subheader' },
        { text: btime.value, margin: [0, 0, 0, 0] },

        { text: 'Exercises', style: 'exercise' },

        {
          table: {
            widths: ['15%', '25%', '15%', '15%', '35%'],
            body: [
              [{ text: 'Name', style: 'cells' },
              { text: 'Description', style: 'cells' },
              { text: 'Type', style: 'cells' },
              { text: 'Number of repetitions/time', style: 'cells' },
              { text: 'Photo', style: 'cells', width: 150, height: 150 }]
            ]
          }
        },
        training.exercises.map(res => {
          if (this.loadTimeExercise(res)) {
            if (res.photo == "./assets/imgs/imgDefault.png") {
              return {
                table: {
                  widths: ['15%', '25%', '15%', '15%', '35%'],
                  body: [
                    [{ text: res.nameExercise, style: 'cells' },
                    { text: res.description, style: 'cells' },
                    { text: res.type, style: 'cells' },
                    { text: this.timeExer.value, style: 'cells' },
                    { image: this.logo.default, style: 'cells', width: 150, height: 150 }]
                  ]
                }
              }
            } else {
              return {
                table: {
                  widths: ['15%', '25%', '15%', '15%', '35%'],
                  body: [
                    [{ text: res.nameExercise, style: 'cells' },
                    { text: res.description, style: 'cells' },
                    { text: res.type, style: 'cells' },
                    { text: this.timeExer.value, style: 'cells' },
                    { image: res.photo, style: 'cells', width: 150, height: 150 }]
                  ]
                }
              }
            }
          } else {
            if (res.photo == "./assets/imgs/imgDefault.png") {
              return {
                table: {
                  widths: ['15%', '25%', '15%', '15%', '35%'],
                  body: [
                    [{ text: res.nameExercise, style: 'cells' },
                    { text: res.description, style: 'cells' },
                    { text: res.type, style: 'cells' },
                    { text: res.repTime, style: 'cells' },
                    { image: this.logo.default, style: 'cells', width: 150, height: 150 }]
                  ]
                }
              }
            } else {
              return {
                table: {
                  widths: ['15%', '25%', '15%', '15%', '35%'],
                  body: [
                    [{ text: res.nameExercise, style: 'cells' },
                    { text: res.description, style: 'cells' },
                    { text: res.type, style: 'cells' },
                    { text: res.repTime, style: 'cells' },
                    { image: res.photo, style: 'cells', width: 150, height: 150 }]
                  ]
                }
              }
            }
          }

        })

      ],
      styles: {
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        exercise: {
          alignment: 'center',
          fontSize: 14,
          bold: true,
          margin: [15, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        },
        cells: {
          alignment: 'center'
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
  }

  loadTimeExercise(item?: exercise): boolean {
    let flag: boolean = false;
    if (item.type == "Time") {
      flag = true
      if (item.repTime < 60) {
        this.m = 0;
        this.s = item.repTime
      } else {
        this.m = parseInt((item.repTime / 60).toFixed());
        this.s = (item.repTime % 60)
      }
      this.me = String('0' + Math.floor(this.m)).slice(-2);
      this.se = String('0' + Math.floor(this.s)).slice(-2);
      this.text2 = this.me + ':' + this.se;
      this.timeExer.next(this.text2);
    } else {
      flag = false
    }
    return flag
  }

  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
        this.file.writeFile(this.file.dataDirectory,'training.pdf',blob,{replace:true}).then(fileEntry=>{
          this.fileOp.open(this.file.dataDirectory+'training.pdf','application/pdf')
        })
      })
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }
}
