import * as utils from "@work/utils";

/**
 * Work类
 */
export class WorkClass {
  constructor(options = {}) {
    const { activeViewId = "", views = [] } = options;
    this.activeViewId = activeViewId;
    this.views = views;
  }
}

/**
 *  WorkView类
 */
export class WorkViewClass {
  constructor(options = {}) {
    const { title = "new page" } = options;
    this.viewId = utils.base.guid("view-xxxx-xxxx");
    this.title = title;
    this.elements = [];
  }
}

/**
 * WorkComponent类
 */
export class WorkComponentClass {
  constructor(options = {}) {
    const { a = "1111111111111111111111111", x = 0, y = 0, w = 144, h = 0, isResizable = false, elStyle = {}, coName = "", coType = "", coProps = {} } = options;
    const id = utils.base.guid("ele-xxxx-xxxx");
    // gird-item 坐标系
    this.i = id;
    this.x = x;
    this.y = y;
    this.w = w; // 总栅格数：144
    this.h = h;
    this.static = false;
    this.isResizable = isResizable;
    this.fixedHeight = false;

    // 元素唯一id
    this.elId = id;
    // 元素样式
    this.elStyle = elStyle;
    // 组件name
    this.coName = coName;

    this.coType = coType;
    // 组件props
    this.coProps = coProps;
  }

  changeCoName(newName) {
    this.coName = newName;
  }
}
