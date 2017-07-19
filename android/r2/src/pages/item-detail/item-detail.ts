import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ModalController} from 'ionic-angular';

import { Items } from '../../providers/providers';
import { Restaurant } from '../../providers/providers';
import { SearchFilter } from '../modal/search-filter';

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
  review: any  = 4;
  searchResultCount: any = 0;
  searchDone: any = false;
  range = {val:"4"};
  resultItems: any = [];
  test: any = [];
  resultFound: any = true;
  
  /*private clientId:string = "ctswebscrapingservices";
  private clientSecret:string = "ctswebscrapingservices";
  private grantType:string = "password";*/
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
  getSearchResult(val){	
	var me = this;
	me.resultFound = true;
	this.review = val;
	this.searchDTO.range = val;
	this.searchDone = false;
	me.searchResultCount = 0;
	this.resultItems = [];
	this.restaurant.search(this.searchDTO).subscribe((resp) => {
	  me.searchDone = true;
	  var tmp = resp.json();
	  if(tmp){
		  me.searchResultCount = tmp["restaurantSearchResult"].length;		  
		  for(var i=0; i< tmp["restaurantSearchResult"].length;i++){
			me.resultItems.push(tmp["restaurantSearchResult"][i]);
		  }
	  }
	  if(me.searchResultCount == 0){
		me.resultFound = false;
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
    var modalPage = this.modalCtrl.create(SearchFilter);
	modalPage.onDidDismiss(data => {
	 this.getSearchResult(data);
   });
    modalPage.present();
  }
}
