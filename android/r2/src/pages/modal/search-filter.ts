import { Component, EventEmitter, Output} from '@angular/core';
import { NavController, NavParams, ViewController , Platform} from 'ionic-angular';
import { ItemDetailPage } from '../item-detail/item-detail';

@Component({
selector: 'search-filter',
  templateUrl: 'search-filter.html'
})
export class SearchFilter {
	@Output() emitToParent = new EventEmitter();
	mobile: any = false;
	review: any = 4;
	constructor(
		public navCtrl: NavController, 
		public viewCtrl : ViewController,
		public navParams: NavParams, 
		public platform: Platform
	) {
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
		if(this.mobile){
			this.dismiss();
		}else{
			this.emitToParent.emit(this.review);
		} 		
	}
}
