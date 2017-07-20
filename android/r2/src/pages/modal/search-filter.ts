import { Component, EventEmitter, Output} from '@angular/core';
import { NavController, NavParams, ViewController , Platform} from 'ionic-angular';

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
		this.review = navParams.get('review');
		if(!this.review){
			this.review = 4;
		}
		if(this.platform.is("mobile")){
			this.mobile = true;
		}
	}
	public dismiss(action){
		this.viewCtrl.dismiss({ 'review': this.review, 'action':action });
	}
	ionViewDidLoad() {
		console.log('ionViewDidLoad ModalPage');
	}
	getSearchResult(val){
		this.review = val;
		if(this.mobile){
			this.dismiss('search');
		}else{
			this.emitToParent.emit(this.review);
		} 		
	}
}
