import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { user } from 'src/app/model/user';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { PresentService } from 'src/app/services/present.service';

@Component({
  selector: 'app-listfriends',
  templateUrl: './listfriends.page.html',
  styleUrls: ['./listfriends.page.scss'],
})
export class ListfriendsPage implements OnInit {
  users: user[]
  nUser:number
  constructor( private modalController: ModalController,
    private api: ApiService,
    private authS: AuthService,
    private present: PresentService) { }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    await this.loadUsers();
  }
  public async loadUsers($event = null) {
    // await this.present.presentLoading;
    try {
      this.users = await this.api.getAllFriends(this.authS.getUser().id);
      this.nUser=this.users.length
      if ($event) {
        $event.target.complete();
      }
      //    this.present.dismissLoad();
    } catch (err) {
      this.users = null; //vista
      //      this.present.dismissLoad();
      await this.present.presentToast("Error al cargar los entrenamientos", "danger");
    }
  }
  async removeFriendBtn(u:user) {
    await this.removeFriend(u);
     await this.loadUsers();
  }
  public async removeFriend(u:user){
    await this.api.deleteFromFriendship(this.authS.getUser(),u).then(result=>{}).catch(err=>{console.log(err.error)});
  }

  public async searchUsers($event) {
    let value = $event.detail.value;
    value = value.trim();
    if (value !== '') {
      //await this.ui.showLoading();
      this.api.searchFriends(this.authS.getUser().id,value)
        .then(d => {
          this.users = d;
        })
        .catch(async err => await this.present.presentToast(err.error, "danger"))
        .finally(async () => {
          // await this.ui.hideLoading();
          // this.myInput.setFocus();
        });
    } else {
      await this.loadUsers();
    }
  }
  public exit() {
    this.modalController.dismiss();
  }
}
