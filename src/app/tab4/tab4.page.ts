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

  num: number = 0;
  trainings: training[] = []
  search
  constructor(private api: ApiService,
    private authS: AuthService,
    private modalController: ModalController,
    private present: PresentService) { }

  ngOnInit() {
  }
  async ionViewDidEnter() {
    await this.refrescar()
  }
  public async loadAll($event = null) {
    try {
      this.present.presentLoading().then(async res => {
        this.authS.getUser().friends = await this.api.getAllFriends(this.authS.getUser().id);
        if ($event) {
          $event.target.complete();
          this.num = 0
          this.trainings = []
        }
        this.authS.getUser().friends.forEach(friend => {
          this.api.getAllTrainingsByIdUserIsPublished(friend.id, this.num).then(result => {
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
                  email: friend.email,
                  avatar: friend.avatar
                }
              }
              this.trainings = this.trainings.concat(t)

            });
          }).catch(err => {
            console.log(err)
          });
        });
        if (this.trainings != null || this.trainings != undefined) {
          this.present.dismissLoad()
        }
      }).catch(err => { console.log(err) })
    } catch (err) {
      this.trainings = null;
      console.log(err)
      await this.present.presentToast("Error al cargar los entrenamientos", "danger");
    }
  }
  refrescar() {
    this.num = 0
    this.trainings = []
    this.loadAll();
}
  loadMore($event = null) {
    setTimeout(() => {
      this.num += 10
      if(this.search!=undefined){
        console.log(this.num)
        this.searchTrainingsFriends(this.search)
      }else{
        this.loadAll()
      }
      $event.target.complete();
    }, 500);
  }

  async openExecuteTrainingBtn(t: training) {
    await this.openExecuteTraining(t);
    await this.refrescar();
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
    await this.refrescar();
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
    await this.refrescar()
  }

  async openAddFriend(): Promise<any> {
    const modal = await this.modalController.create({
      component: AddFriendsPage,
      cssClass: 'my-custom-class',

    });

    await modal.present();
    return await modal.onWillDismiss();
  }


  public async searchTrainingsFriends($event) {
    let value
    if($event.detail!=undefined){
       value = $event.detail.value;
      this.trainings=[]
      this.num=0
    }else{
      value=$event
      console.log("HOLA "+value)
    }
    value = value.trim();
    this.search=value
    if (value != '') {
      this.api.searchTrainingOfFriendsByTitle(value, this.authS.getUser().id, this.num)
        .then(d => {
          this.trainings = this.trainings.concat(d);
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
