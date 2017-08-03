import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';



@Component({
  selector: 'main-header',
  templateUrl: 'header.html'
})
export class HeaderPage {
  searchControl: FormControl;

  constructor(public navCtrl: NavController, public navParams: NavParams) { 
	this.searchControl = new FormControl();
  }

 
  ionViewDidLoad() {
  }
}
