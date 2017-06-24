import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { ItemDetailPage } from '../item-detail/item-detail';
import { Item } from '../../models/item';
import { Items } from '../../providers/providers';
import 'rxjs/add/operator/debounceTime';



@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  
  searchTerm: string = '';
  currentItems: any = [];
  searching: any = false;
  searchControl: FormControl;

  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items) { 
	this.searchControl = new FormControl();
  }

  /**
   * Perform a service for the proper items.
   */
 /* getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    this.currentItems = this.items.query({
      name: val
    });
  }*/
  
  getItems() {
    let val = this.searchTerm;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    this.currentItems = this.items.query({
      name: this.searchTerm
    });
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }
  
  ionViewDidLoad() {
		this.searchControl.valueChanges.debounceTime(700).subscribe(search => { 
            this.searching = false;
            this.getItems(); 
        });
    }
	onSearchInput(){
        this.searching = true;
    }

}
