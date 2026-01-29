import { ApplicationError } from "../../error-handler/applicationError.js";
import { UserModel } from "../user/user.model.js";

export default class ProductModel {
  constructor(
    name,
    desc,
    price,
    imageUrl,
    category,
    sizes,
    inStock,
    id
  ) {
    this._id = id;
    this.name = name;
    this.desc = desc;
    this.imageUrl = imageUrl;
    this.category = category;
    this.price = price;
    this.sizes = sizes;
    this.inStock=inStock;
  }

}