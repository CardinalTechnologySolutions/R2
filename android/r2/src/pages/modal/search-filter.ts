import { Component } from '@angular/core';
import { NavController, NavParams, ViewController  } from 'ionic-angular';



@Component({
selector: 'search-filter',
  templateUrl: 'search-filter.html'
})
export class SearchFilter {
	constructor(public navCtrl: NavController, public viewCtrl : ViewController ,public navParams: NavParams) {
	}
	public closeModal(){
		this.viewCtrl.dismiss();
	}
	ionViewDidLoad() {
		console.log('ionViewDidLoad ModalPage');
	}
}
