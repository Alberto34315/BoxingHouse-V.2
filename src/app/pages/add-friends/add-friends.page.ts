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
    this.users = []
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
    await this.loadUsers();
  }
  public async loadUsers($event = null) {
    // await this.present.presentLoading;
    try {
      this.users = await this.api.getAllUserLessOwner(this.authS.getUser().id);
      if (this.users.length == 0) {
        this.flag = true;
      } else {
        this.flag = false
      }
      if ($event) {
        $event.target.complete();
      }
      //    this.present.dismissLoad();
    } catch (err) {
      this.users = null; //vista
      //      this.present.dismissLoad();
      await this.present.presentToast("Error al cargar los Usuarios", "danger");
    }
  }

  public save() {
    this.users.forEach(element => {
      if (element.isChecked == false) {
        this.user = element
        this.authS.getUser().friends.push(this.user)
        this.api.updateUser(this.authS.getUser()).then(result => { }).catch(err => { console.log(err.error) });
      }
    });
    this.modalController.dismiss();
  }

  public async searchUsers($event) {
    let value = $event.detail.value;
    value = value.trim();
    if (value !== '') {
      //await this.ui.showLoading();
      this.api.searchUserLessOwner(this.authS.getUser().id, value)
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
