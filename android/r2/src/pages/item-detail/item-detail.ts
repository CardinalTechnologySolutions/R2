import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ToastController, ModalController, Platform} from 'ionic-angular';

import { Items } from '../../providers/providers';
import { Restaurant } from '../../providers/providers';
import { SearchFilter } from '../modal/search-filter';


@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage{
  mobile: any = false;
  distanceFromTop: any = -99999;
  scrolledToTop: any = false;
  item: any;
  searchDone: any = false;
  range = {val:"4"};
  resultItems: any = [];
	searchDTO: { 
		range:string
		limit:any
	} = {
		range:this.range.val,
		limit:20
	};
  constructor(
	public navCtrl: NavController, 
	navParams: NavParams, 
	items: Items, 
	public restaurant: Restaurant, 
	public toastCtrl: ToastController,
	public modalCtrl: ModalController,
	private zone: NgZone,
	public platform: Platform
	) {
		this.item = navParams.get('item') || items.defaultItem;	
		if(this.platform.is("mobile")){
			this.mobile = true;
		}
  }
  ionViewDidLoad() {
	this.distanceFromTop = 0;
	this.getSearchResult(4);	
  }
  scrollHandler(event){	
	if(!this.mobile || this.distanceFromTop == event.scrollTop)return;
	//console.log('event = ' + JSON.stringify(event));
	var top = this.getPositionFromTop(document.getElementById('search-filter'));
	
	if(this.distanceFromTop < event.scrollTop){ // Scroll down, content moving up
		if(top && top <= 50 && !this.scrolledToTop){
			this.zone.run(() => {				
				this.scrolledToTop = true;
				this.distanceFromTop = event.scrollTop;
			});
		 }
	}else{ // Scroll up, content moving down	
		if(!top && this.scrolledToTop){
			this.zone.run(() => {
				this.scrolledToTop = false;
				this.distanceFromTop = event.scrollTop;
			});
		 }
	}
	 
  }
  getPositionFromTop(elem) { 
		var top = 0;
		do { 
			top += elem.offsetTop-elem.scrollTop; 
		} while ( elem = elem.offsetParent ); 

		return top; 
	} 
  triggerWebSearch(event){
	this.searchDone = false;
	this.getSearchResult(event);
  }
  getSearchResult(val){	
	var me = this;
	me.searchDTO.range = val;	
	me.resultItems = [];
	this.restaurant.search(this.searchDTO).subscribe((resp) => {
	  me.searchDone = true;
	  var tmp = resp.json();
	  if(tmp){		  
		  for(var i=0; i< tmp["restaurant"].length;i++){
			me.resultItems.push(tmp["restaurant"][i]);
		  }
	  }
  
    }, (err) => {
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: "Search Error",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
  showSearchFilter(){	
	var modalPage = this.modalCtrl.create(SearchFilter, {review:this.searchDTO.range}, {
        showBackdrop: false,
        enableBackdropDismiss: false,
        enterAnimation: 'modal-scale-up-enter'
    });
	modalPage.onDidDismiss(data => {
		if(data.action === 'search'){
			this.searchDone = false;
			this.getSearchResult(data.review);
		}	 
	});
    modalPage.present();
  }
}
