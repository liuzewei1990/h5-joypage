export const jsonToTree = (data, config) => {
  let id = config.id || "id",
    pid = config.pid || "pid",
    children = config.children || "children",
    idMap = [],
    jsonTree = [];
  data.forEach(function (v) {
    idMap[v[id]] = v;
  });
  data.forEach(function (v) {
    let parent = idMap[v[pid]];
    if (parent) {
      !parent[children] && (parent[children] = []);
      parent[children].push(v);
    } else {
      jsonTree.push(v);
    }
  });
  return jsonTree;
};

export const treeToJson = (data, config = {}) => {
  let id = config.id || "id",
    pid = config.pid || "pid",
    children = config.children || "children",
    json = [];
  json = data.reduce((arr, cur) => {
    let item = Object.assign({}, cur);
    if (children in cur) {
      delete item[children];
      return arr.concat([item], treeToJson(cur[children], config));
    } else {
      return arr.concat([item]);
    }
  }, []);
  return json;
};
