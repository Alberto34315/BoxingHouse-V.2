import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { training } from '../model/training';
import { user } from '../model/user';
import { AddFriendsPage } from '../pages/add-friends/add-friends.page';
import { ExecuteTrainingPage } from '../pages/execute-training/execute-training.page';
import { ListfriendsPage } from '../pages/listfriends/listfriends.page';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { PresentService } from '../services/present.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  trainings: training[]
  constructor(private api: ApiService,
    private authS: AuthService,
    private modalController: ModalController,
    private present: PresentService) { }

  ngOnInit() {
  }
  async ionViewDidEnter() {
    await this.loadAll();
  }
  public async loadAll($event = null) {
    // await this.present.presentLoading;
    this.trainings = []
    this.authS.getUser().friends = await this.api.getAllFriends(this.authS.getUser().id);

    try {
      this.authS.getUser().friends.forEach(friend => {
        this.api.getAllTrainingsByIdUserIsPublished(friend.id).then(result => {
          result.forEach(element => {
            let t: training = {
              id: element.id,
              title: element.title,
              time: element.time,
              published: element.published,
              exercises: element.exercises,
              creator: {
                id: friend.id,
                name: friend.name,
                email: friend.email
              }
            }
            this.trainings.push(t)
          });
        }).catch(err => {
          console.log(err)
        });
      });
      if ($event) {
        $event.target.complete();
      }
      //    this.present.dismissLoad();
    } catch (err) {
      this.trainings = null; //vista
      //      this.present.dismissLoad();
      console.log(err)
      await this.present.presentToast("Error al cargar los entrenamientos", "danger");
    }
  }
  async openExecuteTrainingBtn(t: training) {
    await this.openExecuteTraining(t);
    await this.loadAll();
  }
  async openExecuteTraining(t?: any): Promise<any> {

    const modal = await this.modalController.create({
      component: ExecuteTrainingPage,
      cssClass: 'my-custom-class',
      componentProps: {
        trainingExe: t
      }
    });

    await modal.present();
    return await modal.onWillDismiss();
  }

  async openListFriendsBtn() {
    await this.openListFriends();
    await this.loadAll();
  }

  async openListFriends(): Promise<any> {
    const modal = await this.modalController.create({
      component: ListfriendsPage,
      cssClass: 'my-custom-class',

    });
    await modal.present();
    return await modal.onWillDismiss();
  }

  async openAddFriendBtn() {
    await this.openAddFriend();
    setTimeout(() => {
      this.loadAll();
    }, 100);
  }

  async openAddFriend(): Promise<any> {
    const modal = await this.modalController.create({
      component: AddFriendsPage,
      cssClass: 'my-custom-class',

    });
    
    await modal.present();
    return await modal.onWillDismiss();
  }

  
  public async searchTrainingsFriends($event){
    this.trainings = []
    let value = $event.detail.value;
    value = value.trim();
    if (value !== '') {
      this.api.searchTrainingOfFriendsByTitle(value, this.authS.getUser().id)
       .then(d => {
          this.trainings = d;
        })
        .catch(async err => await this.present.presentToast(err.error, "danger"))
        .finally(async () => {
          
        });
    } else {
      await this.loadAll();
    }
  }
}
