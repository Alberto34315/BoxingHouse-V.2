import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { records } from 'src/app/model/records';
import { training } from 'src/app/model/training';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { PresentService } from 'src/app/services/present.service';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.page.html',
  styleUrls: ['./historical.page.scss'],
})
export class HistoricalPage implements OnInit {
  date: Date;
  trainings: training[];
  records: records[];
  num: number = 0;
  search
  constructor(private modalController: ModalController,
    private api: ApiService,
    private authS: AuthService,
    private present: PresentService) { }

  ngOnInit() {
  }
  async ionViewDidEnter() {
    await this.refrescar()
  }
  public async loadAll($event = null) {
    try { 
      if ($event) {
        $event.target.complete();
        this.num = 0
        this.records = []
      }
      this.present.presentLoading().then(async res => {
      this.records = this.records.concat(await this.api.getRecordsByUser(this.authS.getUser().id, this.num));
      if (this.records != null || this.records != undefined) {
        this.present.dismissLoad()
      }
    }).catch(err => { console.log(err) })
    } catch (err) {
      this.records = null;
      await this.present.presentToast("Error al cargar los entrenamientos", "danger");
    }
  }
  public exit() {
    this.modalController.dismiss();
  }
  loadMore($event = null) {
    setTimeout(() => {
      this.num += 10
      if(this.search!=undefined){
        this.searchRecords(this.search)
      }else{
        this.loadAll()
      }
      $event.target.complete();
    }, 500);
  }
  format(i?: Date): boolean {
    let result = true;
    this.date = new Date(i);
    return result;
  }
  refrescar() {
    this.num = 0
    this.records = []
    this.loadAll();
}
  public async searchRecords($event) {
    let value
    if($event.detail!=undefined){
       value = $event.detail.value;
      this.records=[]
      this.num=0
    }else{
      value=$event
    }
    value = value.trim();
    this.search=value
    if (value != '') {
      this.api.searchRecords(this.authS.getUser().id, value, this.num)
        .then(d => {
          this.records = this.records.concat(d);
        })
        .catch(async err => await this.present.presentToast(err.error, "danger"))
        .finally(async () => {
        });
    } else {
      this.search=undefined
      this.refrescar()
    }
  }
}
