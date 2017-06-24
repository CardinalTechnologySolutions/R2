import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Item } from '../../models/item';

@Injectable()
export class Items {
 
  items: Item[] = [];

  defaultItem: any = {
        "name": "Lucknow",
		"rating": "*****",
        "profilePic": "assets/img/restaurant/4.jpg",
        "about": "Lucknow, a large city in northern India, is the capital of the state of Uttar Pradesh. Toward its center is Rumi Darwaza, a Mughal gateway. Nearby, the 18th-century Bara Imambara shrine has a huge arched hall. Upstairs, Bhool Bhulaiya is a maze of narrow tunnels with city views from its upper balconies. Close by, the grand Victorian Husainabad Clock Tower was built as a victory column in 1881.",
  };


  constructor(public http: Http) {
    let items = [
      {
        "name": "New York City",
		"rating": "*****",
		"special": "Did you know: New York is the fourth-most-populous city in the Americas (8,550,405).",
        "profilePic": "assets/img/cities/new-yark-city.jpg",
        "about": "New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that’s among the world’s major commercial, financial and cultural centers. Its iconic sites include skyscrapers such as the Empire State Building and sprawling Central Park. Broadway theater is staged in neon-lit Times Square."
      },
      {
        "name": "Washington",
		"rating": "*****",
        "profilePic": "assets/img/cities/washington.jpg",
        "about": "Washington DC"
      },
      {
        "name": "Chicago",
		"rating": "*****",
        "profilePic": "assets/img/cities/chicago.jpg",
        "about": "Chicago"
      },
      {
        "name": "IndianaPolis",
		"rating": "*****",
        "profilePic": "assets/img/cities/indianapolis.jpg",
        "about": "IndianaPolis"
      }
    ];

    for (let item of items) {
      this.items.push(new Item(item.name, item.rating, item.profilePic, item.about));	  
    }
  }

  query(params?: any) {
    if (!params) {
      return [];
    }

    return this.items.filter((item) => {
      /*for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;*/
	   return item.name.toLowerCase().indexOf(params.name.toLowerCase()) > -1;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
