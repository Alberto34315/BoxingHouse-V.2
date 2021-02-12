import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { user } from 'src/app/model/user';
import { ApiService } from 'src/app/services/api.service';
import jsSHA from 'jssha';
import { PresentService } from 'src/app/services/present.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public task: FormGroup;
  public data: user;
  constructor(private formBuilder: FormBuilder,
    private present: PresentService,
    private api: ApiService,
    private router: Router) {
    this.task = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      pass: ['', Validators.required]
    })
  }

  ngOnInit() {
  }
  public async sendForm() {
    await this.present.presentLoading();
    let shaObj = new jsSHA("SHA-256", "TEXT");
    shaObj.update(this.task.get('pass').value);
    let hash = shaObj.getHash("HEX");
    let email = this.task.get('email').value;
    this.api.searchEmail(email).then(result => {
      if (result.email == email) {
        this.task.setValue({
          name: '',
          email: '',
          pass: ''
        })
        this.present.dismissLoad();
        this.present.presentToast("La cuenta ya está creada", "danger");
      } else {
        this.data = {
          name: this.task.get('name').value,
          email: email,
          pass: hash,
          avatar: "photo"
        }
        this.api.createUser(this.data).then((respuesta) => {
          this.task.setValue({
            name: '',
            email: '',
            pass: ''
          })
          this.present.dismissLoad();
          this.present.presentToast("Cuenta creada con éxito", "success");
          this.router.navigate(['/login'])
        }).catch((err) => {
        });
      }
    }).catch((err) => {
    })

  }
}
