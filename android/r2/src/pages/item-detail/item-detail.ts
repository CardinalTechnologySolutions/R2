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
  rating = {val:"4"};
  resultItems: any = [];
  test: any = [];
  
  /*private clientId:string = "ctswebscrapingservices";
  private clientSecret:string = "ctswebscrapingservices";
  private grantType:string = "password";*/
	searchDTO: { 
		rating:string
		limit:any
	} = {
		rating:this.rating.val,
		limit:10
	};

  constructor(public navCtrl: NavController, navParams: NavParams, items: Items, public restaurant: Restaurant, public toastCtrl: ToastController) {
    this.item = navParams.get('item') || items.defaultItem;
  }
  ionViewDidLoad() {
		this.getSearchResult();
  }
  getSearchResult(){	
	
	this.searchDone = false;
	var me = this;
	me.resultItems = [];
	this.restaurant.search(this.searchDTO).subscribe((resp) => {
	  me.searchDone = true;
	  var tmp = resp.json();
	  me.searchResultCount = tmp["restaurantSearchResult"].length;
	  for(var i=0; i< tmp["restaurantSearchResult"].length;i++){
		me.resultItems.push(tmp["restaurantSearchResult"][i]);
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
