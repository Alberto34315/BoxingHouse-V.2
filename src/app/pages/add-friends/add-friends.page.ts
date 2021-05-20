import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { user } from 'src/app/model/user';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { PresentService } from 'src/app/services/present.service';

@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.page.html',
  styleUrls: ['./add-friends.page.scss'],
})
export class AddFriendsPage implements OnInit {
  users: user[]
  user: user
  owner: user
  flag: boolean = true;
  num: number = 0;
  search
  public task: FormGroup;
  constructor(private modalController: ModalController,
    private api: ApiService,
    private formBuilder: FormBuilder,
    private authS: AuthService,
    private present: PresentService) {
    this.task = this.formBuilder.group({
      check: false
    })
  }

  ngOnInit() {
    this.api.getUser(this.authS.getUser().id).then(result => {
      this.owner = result
      this.api.getAllFriends(this.owner.id).then(result => {
        this.authS.getUser().friends = result
      }).catch(err => {
        console.log(err)
      });
    }).catch(err => { })

  }
  async ionViewDidEnter() {
    await this.refrescar()
  }
  public async loadUsers($event = null) {
    try {
      if ($event) {
        $event.target.complete();
        this.num = 0
        this.users = []
      }
      this.present.presentLoading().then(async res => {
        this.users = this.users.concat(await this.api.getAllUserLessOwner(this.authS.getUser().id, this.num));
        if (this.users != null || this.users != undefined) {
          this.present.dismissLoad()
        }
        if (this.users.length == 0) {
          this.flag = true;
        } else {
          this.flag = false
        }
      }).catch(err => { console.log(err) })
    } catch (err) {
      this.users = null;
      await this.present.presentToast("Error al cargar los Usuarios", "danger");
    }
  }
  refrescar() {
    this.num = 0
    this.users = []
    this.loadUsers();
  }

  loadMore($event = null) {
    setTimeout(() => {
      this.num += 10
      /*this.task.get('check').setValue(false)
      console.log(this.task.get('check').value)*/
      if (this.search != undefined) {
        this.searchUsers(this.search)
      } else {
        this.loadUsers()
      }
      $event.target.complete();
    }, 500);
  }
  public save() {
    this.users.forEach(element => {
      if (element.isChecked == false) {
        this.user = element
        this.authS.getUser().friends.push(this.user)
      }
    });
    this.present.presentLoading().then(async res => {
      this.api.updateUser(this.authS.getUser()).then(result => {
        if (result != null || result != undefined) {
          this.present.dismissLoad()
        }
      }).catch(err => { console.log(err.error) });
    }).catch(err => { console.log(err) })
    this.modalController.dismiss();
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
      this.present.presentLoading().then(async res => {
        this.api.searchUserLessOwner(this.authS.getUser().id, value, this.num)
          .then(d => {
            this.users = this.users.concat(d);
          })
          .catch(async err => await this.present.presentToast(err.error, "danger"))
          .finally(async () => {
          });
        if (this.users != null || this.users != undefined) {
          this.present.dismissLoad()
        }
      }).catch(err => { console.log(err) })
    } else {
      this.search = undefined
      this.refrescar()
    }
  }
  public exit() {
    this.modalController.dismiss();
  }
}
