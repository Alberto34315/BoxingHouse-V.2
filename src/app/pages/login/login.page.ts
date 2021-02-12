import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { user } from 'src/app/model/user';
import { ApiService } from 'src/app/services/api.service';
import jsSHA from 'jssha';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { PresentService } from 'src/app/services/present.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public task: FormGroup;
  public data: user;
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    private authS: AuthService, 
    private present: PresentService,
    private router: Router) { 
      this.task = this.formBuilder.group({
      email: ['', Validators.required],
      pass: ['', Validators.required]
    })}

  ngOnInit() {
    if (this.authS.isLogged()) {
      this.router.navigate(['/'])
    }
  }
  
  public async sendForm() {
    await this.present.presentLoading();
    let shaObj = new jsSHA("SHA-256", "TEXT");
    shaObj.update(this.task.get('pass').value);
    let hash = shaObj.getHash("HEX");
    let email=this.task.get('email').value;
    this.api.searchCredentials(email,hash).then((respuesta) => {
        this.authS.login(respuesta).then(result=>{
        if (result.id != null) {
          this.present.dismissLoad();
          this.router.navigate(['/'])
        }else{
          this.present.dismissLoad();
          this.present.presentToast("El correo o la contraseña son incorrectos", "danger");
        }
      }).catch((err) => {
        console.log(err)
      });
      
      this.task.setValue({
        email: '',
        pass: ''
      })
    }).catch((err) => {
      console.log(err)
    });
  }
}
