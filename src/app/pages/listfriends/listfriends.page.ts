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
  nUser: number
  num: number = 0;
  search
  constructor(private modalController: ModalController,
    private api: ApiService,
    private authS: AuthService,
    private present: PresentService) { }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.present.presentLoading().then(async res => {
      await this.refrescar()
      if (this.users != null || this.users != undefined) {
        this.present.dismissLoad()
      }
    }).catch(err => { console.log(err) })
  }
  public async loadUsers($event = null) {
    try {
      if ($event) {
        $event.target.complete();
        this.num = 0
        this.users = []
      }
      this.users = this.users.concat(await this.api.getAllFriendsLimit(this.authS.getUser().id, this.num));
      this.nUser = this.users.length
    } catch (err) {
      this.users = null;
      await this.present.presentToast("Error al cargar los entrenamientos", "danger");
    }
  }
  async removeFriendBtn(u: user) {
    await this.removeFriend(u);
    this.users.splice(this.users.indexOf(u),1)
    this.refrescar()
  }
  public async removeFriend(u: user) {
    await this.api.deleteFromFriendship(this.authS.getUser(), u).then(result => { }).catch(err => { console.log(err.error) });
  }
  refrescar() {
    this.num = 0
    this.users = []
    this.loadUsers();
  }

  loadMore($event = null) {
    setTimeout(() => {
      this.num += 10
      if (this.search != undefined) {
        this.searchUsers(this.search)
      } else {
        this.loadUsers()
      }
      $event.target.complete();
    }, 500);
  }
  public async searchUsers($event) {
    let value
    if ($event.detail != undefined) {
      value = $event.detail.value;
      this.users = []
      this.num = 0
    } else {
      value = $event
    }
    value = value.trim();
    this.search = value
    if (value != '') {
      this.api.searchFriends(this.authS.getUser().id, value, this.num)
        .then(d => {
          this.users = this.users.concat(d);
        })
        .catch(async err => await this.present.presentToast(err.error, "danger"))
        .finally(async () => {
        });
    } else {
      this.search = undefined
      this.refrescar()
    }
  }

  public exit() {
    this.modalController.dismiss();
  }
}
