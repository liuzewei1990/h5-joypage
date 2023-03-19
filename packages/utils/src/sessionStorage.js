/* localstorage封装，缓存对象 */

/** key前缀 */
const keyPrefix = "work$_";

const storage = {
  set: () => {},
  get: () => "",
  has: () => false,
  remove: () => {},
  clear: () => {},
  clearSelf: () => {}
};

/**
 * 是否过期
 */
const isFresh = (valObj) => {
  const now = new Date().getTime();
  return valObj.addTime + valObj.expires >= now;
};

/* 给key值添加前缀 */
const addPrefix = (key) => {
  return `${keyPrefix}${key}`;
};

/* 加方法 */
const extend = (s) => {
  return {
    set(key, value, expires) {
      const skey = addPrefix(key);
      if (expires) {
        s.setItem(
          skey,
          JSON.stringify({
            value,
            addTime: new Date().getTime(),
            expires
          })
        );
      } else {
        const val = JSON.stringify(value);
        s.setItem(skey, val);
      }
      if (value === undefined || value === null) {
        s.removeItem(skey);
      }
    },
    get(key) {
      const skey = addPrefix(key);
      const item = JSON.parse(s.getItem(skey));

      // 如果有addTime的值，说明设置了失效时间
      if (item && item.addTime) {
        if (isFresh(item)) {
          return item.value;
        }
        /* 缓存过期，清除缓存，返回null */
        s.removeItem(skey);
        return null;
      }
      return item;
    },
    has(key) {
      const skey = addPrefix(key);
      return !!s.getItem(skey);
    },
    remove: (key) => {
      const skey = addPrefix(key);
      s.removeItem(skey);
    },
    clear: () => {
      s.clear();
    },
    clearSelf: () => {
      const arr = Array.from({ length: s.length }, (_, i) => s.key(i)).filter((str) => str?.startsWith(keyPrefix));
      arr.forEach((str) => s.removeItem(str));
    }
  };
};

Object.assign(storage, extend(window.sessionStorage));

export default storage;
