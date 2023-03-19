export default class PageVo {
  constructor(pageVo = {}) {
    // 拷贝
    if (pageVo.__ob__) {
      pageVo = JSON.parse(JSON.stringify(this.user));
    }

    // 单页条数 默认20条
    this.size = pageVo.size || 20;
    // 当前页 默认第一页
    this.current = pageVo.current || 1;
    // 数据条目总数
    this.total = pageVo.total || 0;
    // 排序字段列表 column字段名 asc是否升序item:{ column: "column", asc: true }
    this.orders = pageVo.orders || [];

    // 请求参数，字段的模糊查询匹配
    this.likeMap = pageVo.likeMap || {};
    // 请求参数，字段的相同匹配
    this.andMap = pageVo.andMap || {};
    // 请求参数，大于等于
    this.geMap = pageVo.geMap || new Map();
    // 请求参数，小于等于
    this.leMap = pageVo.leMap || new Map();

    // 额外参数
    this.param = pageVo.param || {};
    // 额外列表参数
    this.params = pageVo.params || [];

    // 返回数据列表
    this.Datas = pageVo.Datas || [];
  }
}
