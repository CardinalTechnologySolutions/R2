import { Component} from '@angular/core';
import { NavController, NavParams, ToastController, ModalController} from 'ionic-angular';

import { Items } from '../../providers/providers';
import { Restaurant } from '../../providers/providers';
import { SearchFilter } from '../modal/search-filter';


@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage{
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
	public modalCtrl: ModalController
	) {
		this.item = navParams.get('item') || items.defaultItem;	
  }
  ionViewDidLoad() {
		this.getSearchResult(4);
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
		  for(var i=0; i< tmp["restaurantSearchResult"].length;i++){
			me.resultItems.push(tmp["restaurantSearchResult"][i]);
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
