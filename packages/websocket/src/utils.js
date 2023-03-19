export const guid = function guid(templateStr = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx") {
  return templateStr.replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
