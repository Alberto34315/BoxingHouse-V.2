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

  trainings: training[];
  records:records[];
  constructor(private modalController: ModalController,
    private api: ApiService,
    private authS: AuthService,
    private present: PresentService) { }

  ngOnInit() {
  }
  async ionViewDidEnter() {
    await this.loadAll();
    console.log(this.records)
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
}
