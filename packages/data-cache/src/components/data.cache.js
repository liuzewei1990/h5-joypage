import { ___dataCache___, storageSave, clear, getPrototypes, getKey, getDataCacheTarget } from "../components/utils.js";
import * as utils from "@work/utils";

const mixin = {
  // 在data初始化之前，将持久化的数据还原
  beforeCreate() {
    if (!this.$route && !this.$options.dataCacheKey) return;
    // 创建一个uuid 用于当作缓存的key
    // if (!this.data_cache_uuid) {
    //   this.data_cache_uuid = utils.base.guid("data-cache-xxxx-xxxx-xxxx-xxxx");
    // }

    this.data_cache_uuid = this.$route?.path || "data-cache"; // 包含路由参数区分

    const _this = this;
    const vmOptionsData = this.$options.data;
    if (typeof vmOptionsData !== "function" || this.$options.dataCache === undefined) return;
    // 查看是否有缓存
    const cacheData = ___dataCache___[getKey(this.data_cache_uuid, _this.$options.dataCacheKey)];
    this.$options.data = function () {
      let data = vmOptionsData.apply(this, arguments);
      // 合并缓存数据
      cacheData && (data = _.defaultsDeep(cacheData, data));
      return data;
    };
  },

  // 注册触发持久化目标的监听
  created() {
    if (!this.$route && !this.$options.dataCacheKey) return;
    // 支持实例与混入的混合使用
    const dataCacheOptions = getPrototypes(this.$options)
      .filter((x) => x.dataCache)
      .map((x) => x.dataCache);
    if (dataCacheOptions.length === 0) return;

    // 收集持久化配置
    let { target, exclude } = getDataCacheTarget(this, dataCacheOptions);

    let currDataCache = {};
    const cacheKey = getKey(this.data_cache_uuid, this.$options.dataCacheKey);
    const temp = _(target).difference(exclude).uniq().compact().value(); // 排除完全一致的属性

    // watch所有属性进行保存
    temp.forEach((key) => {
      _.set(currDataCache, key, _.get(this, key));
      this.$watch(
        key,
        (val) => {
          _.set(currDataCache, key, val);
          ___dataCache___[cacheKey] = _.omit(currDataCache, exclude); // 排除被包含的属性
          storageSave(___dataCache___);
        },
        { deep: true }
      );
    });
    ___dataCache___[cacheKey] = _.omit(currDataCache, exclude); // 排除被包含的属性
    storageSave(___dataCache___);
  }
};

function install(Vue, options = {}) {
  const { autoClear = true } = options;
  if (autoClear) {
    clear();
  }
  Vue.mixin(mixin);
}

export default { mixin, clear, install };
