import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, RequestMethod} from '@angular/http';
import { Api } from './api';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class Restaurant {

  constructor(public http: Http, public api: Api) {
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  search(searchDTO: any) {
		 let headers = new Headers();
	    headers.append('Content-Type', 'application/json');
		if(!searchDTO.rating || searchDTO.rating === ""){
			searchDTO.rating = "4";
		}
		
	    let data = {
	    	rating: searchDTO.rating
	    };
		return this.api.get('searchRestaurant', data);
		/*return this.http.get('https://www.reddit.com/r/worldnews/.json').map(res => res.json());
		let seq = this.api.get('searchRestaurant', data).share();
		seq
		  .map(res => res.json())
		  .subscribe(res => {
			// If the API returned a successful response, mark the user as logged in
			if (res.status == 'success') {
			} else {
			}
		  }, err => {
			console.error('ERROR', err);
		  });

		return seq;*/
  }
}
