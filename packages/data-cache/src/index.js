import dataCache from "./components/data.cache.js";

if (!window._) throw new Error("注意：data-cache依赖全局lodash工具包");

export default dataCache;
