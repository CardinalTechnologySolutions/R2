/**
 * A generic model that our Master-Detail pages list, create, and delete.
 *
 * Change "Item" to the noun your app will use. For example, a "Contact," or a
 * "Customer," or a "Animal," or something like that.
 *
 * The Items service manages creating instances of Item, so go ahead and rename
 * that something that fits your app as well.
 */
export class Item {
  name: any;
  rating: any;
  profilePic: any;
  about: any;
  constructor(name: any, rating: any, profilePic: any, about: any) {
    this.name = name;
	this.rating = rating;
	this.profilePic = profilePic;
	this.about = about;
  }

}
