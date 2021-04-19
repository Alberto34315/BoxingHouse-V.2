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
  constructor(private modalController: ModalController,
    private api: ApiService,
    private authS: AuthService,
    private present: PresentService) { }

  ngOnInit() {
  }
  async ionViewDidEnter() {
    await this.loadAll();
  }
  public async loadAll($event = null) {
    // await this.present.presentLoading;
    try {
      this.records = await this.api.getRecordsByUser(this.authS.getUser().id);
      if ($event) {
        $event.target.complete();
      }
      //    this.present.dismissLoad();
    } catch (err) {
      this.records = null; //vista
      //      this.present.dismissLoad();
      await this.present.presentToast("Error al cargar los entrenamientos", "danger");
    }
  }
  public exit() {
    this.modalController.dismiss();
  }

  format(i?: Date): boolean {
    let result = true;
    this.date = new Date(i);
    return result;
  }

  public async searchRecords($event) {
    let value = $event.detail.value;
    value = value.trim();
    if (value !== '') {
      //await this.ui.showLoading();
      this.api.searchRecords(this.authS.getUser().id,value)
        .then(d => {
          this.records = d;
        })
        .catch(async err => await this.present.presentToast(err.error, "danger"))
        .finally(async () => {
          // await this.ui.hideLoading();
          // this.myInput.setFocus();
        });
    } else {
      await this.loadAll();
    }
  }
}
