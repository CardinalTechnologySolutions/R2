import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController, NavParams, Config} from 'ionic-angular';
import { MainPage } from '../pages';
import { LoginPage } from '../login/login';


@Component({
  selector: 'main-header',
  templateUrl: 'header.html'
})
export class HeaderPage {
  searchControl: FormControl;

  constructor(public navCtrl: NavController, public navParams: NavParams, private config: Config) { 
	this.searchControl = new FormControl();
  }

 
  ionViewDidLoad() {
  }
   goToHome() {	
	var view = this.navCtrl.getActive();
	if(view.component.name === 'SearchPage'){
		return;
	}
	var token = this.config.get('r3_access_token');
	if(token != null && token != undefined){
		this.navCtrl.push(MainPage);
	}    
  }
  logout() {	
	var view = this.navCtrl.getActive();
	if(view.component.name === 'LoginPage'){
		return;
	}
	this.config.set('r3_access_token', null);
	this.navCtrl.push(LoginPage);
  }
}
