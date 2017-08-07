import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController, Platform, Config} from 'ionic-angular';

import { MainPage } from '../../pages/pages';

import { User } from '../../providers/user';

import { TranslateService } from '@ngx-translate/core';

import { SignupPage } from '../signup/signup';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
	private loginForm : FormGroup;
	mobile: any = false;
	popUpPosition = "bottom";
  
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  private clientId:string = "ctswebscrapingservices";
  private clientSecret:string = "ctswebscrapingservices";
  private grantType:string = "password";
	account: { 
		username: string, 
		password: string, 
		clientId:string, 
		clientSecret:string, 
		grantType:string
	} = {
		username: 'admin',
		password: 'admin',
		clientId: this.clientId,
		clientSecret: this.clientSecret,
		grantType: this.grantType
	};

  // Our translated text strings
  private loginErrorString: string;

  constructor(
	public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
	public loader: LoadingController,
	public formBuilder: FormBuilder,
	public platform: Platform,
	private config: Config
	) {
	if(this.platform.is("mobile")){
		this.mobile = true;
	}
	if(this.mobile){
		this.popUpPosition = "top";
	}
	this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
	this.loginForm.controls['username'].setValue("admin");
	this.loginForm.controls['password'].setValue("admin");
    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
  doLogin() {  
	if(!this.loginForm.valid){
		let validationMessage = this.toastCtrl.create({
        message: "Please input user credentials and try again.",
        duration: 3000,
		position:this.popUpPosition
      });
      validationMessage.present();
	  return;
	}
	if(this.loginForm.controls['username'].value !== 'admin' || this.loginForm.controls['password'].value !== 'admin'){
		let validationMessage = this.toastCtrl.create({
        message: "Invalid user credentials",
        duration: 3000,
		position:this.popUpPosition
      });
      validationMessage.present();
	  return;
	}
	  let loading = this.loader.create({
		content: 'Authenticating...please wait.'
	  });
	  loading.present();
	
    this.user.login(this.account).subscribe((resp) => {
	  var response = resp.json();
	  this.config.set('r3_access_token', response.access_token);
	  setTimeout(() => {
		loading.dismiss();
	  }, 1000);
      this.navCtrl.push(MainPage);
    }, (err) => {
	  setTimeout(() => {
		loading.dismiss();
	  }, 1000);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
		position:this.popUpPosition
      });
      toast.present();
    });
  }
   signup() {
    this.navCtrl.push(SignupPage,{},{animate:false});
  }
}

