import { Component } from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';

import { Items } from '../../providers/providers';
import { Restaurant } from '../../providers/providers';

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
  searchResultCount: any = 0;
  searchDone: any = false;
  range = {val:"4"};
  resultItems: any = [];
  test: any = [];
  resultFound: any = false;
  
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

  constructor(public navCtrl: NavController, navParams: NavParams, items: Items, public restaurant: Restaurant, public toastCtrl: ToastController) {
    this.item = navParams.get('item') || items.defaultItem;
  }
  ionViewDidLoad() {
		this.getSearchResult(4);
  }
  getSearchResult(val){	
	this.searchDTO.range = val;
	this.searchDone = true;
	var me = this;
	this.resultItems = [];
	me.resultFound = true;
	this.restaurant.search(this.searchDTO).subscribe((resp) => {
	  me.searchDone = true;
	  var tmp = resp.json();
	  if(tmp){
		  me.searchResultCount = tmp["restaurantSearchResult"].length;
		  if(me.searchResultCount == 0){
			me.resultFound = false;
		  }
		  for(var i=0; i< tmp["restaurantSearchResult"].length;i++){
			me.resultItems.push(tmp["restaurantSearchResult"][i]);
		  }
	  }else{
		me.resultFound = true;
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
}
