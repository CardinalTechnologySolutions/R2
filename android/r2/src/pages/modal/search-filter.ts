import { Component } from '@angular/core';
import { NavController, NavParams, ViewController , Platform} from 'ionic-angular';



@Component({
selector: 'search-filter',
  templateUrl: 'search-filter.html'
})
export class SearchFilter {
	mobile: any = false;
	review: any = 4;
	constructor(public navCtrl: NavController, public viewCtrl : ViewController ,public navParams: NavParams, public platform: Platform) {
		if(this.platform.is("mobile")){
			this.mobile = true;
		}
	}
	public dismiss(){
		this.viewCtrl.dismiss(this.review);
	}
	ionViewDidLoad() {
		console.log('ionViewDidLoad ModalPage');
	}
	getSearchResult(val){
	 this.review = val;
	 this.dismiss();
	}
}
