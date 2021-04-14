import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { PresentService } from 'src/app/services/present.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.page.html',
  styleUrls: ['./graph.page.scss'],
})
export class GraphPage implements OnInit {

  constructor(private modalController: ModalController,
    private api: ApiService,
    private authS: AuthService,
    private present: PresentService) { }

  ngOnInit() {
  }
  public exit() {
    this.modalController.dismiss();
  }

}
