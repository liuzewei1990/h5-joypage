import { array, object, string } from "vue-types";
import BaseAttr from "./base.attr.class";

class Attr extends BaseAttr {
  constructor() {
    super();
    this.imgSrc = string().def("");
    this.imgData = object().def({});
    this.imgList = array().def([]);
  }
}

export default new Attr();
