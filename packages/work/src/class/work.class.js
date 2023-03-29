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

    // 组件绝对定位信息
    this.pos = { left: 0, top: 0, width: 0, height: 0 };

    // 是否是浮动自由布局
    this.isDerailed = false;
    this.wsca = 0; // width 缩放值
    this.lsca = 0; // left  缩放值
  }

  changeCoName(newName) {
    this.coName = newName;
  }
}

export class WorkComponentStyleClass {
  constructor() {
    // 背景颜色
    this.bgColor = "#ffffff";
    // 背景图片模式
    this.bgSize = "contain";
    // 背图片
    this.bgImg = "";
    // 外边距
    this.mar_s = 0;
    this.margin = [
      { title: "t", val: 0 },
      { title: "b", val: 0 },
      { title: "l", val: 0 },
      { title: "r", val: 0 }
    ];
    // 内边距
    this.pad_s = 0;
    this.padding = [
      { title: "t", val: 0 },
      { title: "b", val: 0 },
      { title: "l", val: 0 },
      { title: "r", val: 0 }
    ];
    // 边框
    this.border = 0;
    // 边框颜色
    this.borderColor = "#999999";
    // 圆角 {tl:0,tr:0,bl:0,br:0}
    this.bor_r_r = 0;
    this.borderRadius = [
      { title: "lt", val: 0 },
      { title: "rt", val: 0 },
      { title: "lb", val: 0 },
      { title: "rb", val: 0 }
    ];
  }

  // 将WorkComponentStyleClass数据转换成 css 需要的 px单位
  static transformStylePx(elStyle = {}) {
    const { bgImg, bgSize, margin = [], padding = [], borderRadius = [] } = elStyle;
    // 利用css无效属性特性自动过滤
    return {
      backgroundColor: elStyle.bgColor,
      backgroundSize: bgSize,
      backgroundImage: `url(${bgImg})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",

      marginTop: `${margin[0]?.val}px`,
      marginBottom: `${margin[1]?.val}px`,
      marginLeft: `${margin[2]?.val}px`,
      marginRight: `${margin[3]?.val}px`,

      paddingTop: `${padding[0]?.val}px`,
      paddingBottom: `${padding[1]?.val}px`,
      paddingLeft: `${padding[2]?.val}px`,
      paddingRight: `${padding[3]?.val}px`,

      border: `${elStyle.border}px solid ${elStyle.borderColor}`,

      borderTopLeftRadius: `${borderRadius[0]?.val}px`,
      borderTopRightRadius: `${borderRadius[1]?.val}px`,
      borderBottomLeftRadius: `${borderRadius[2]?.val}px`,
      borderBottomRightRadius: `${borderRadius[3]?.val}px`
    };
  }
}
