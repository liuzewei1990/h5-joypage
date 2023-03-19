export const commonInterceptor = (responseData) => {
  let { datatypeParam, headerModel } = responseData || {};
  if (headerModel.code == "0") {
    return Promise.resolve(datatypeParam);
  } else {
    const msg = headerModel.message || "系统未知异常";
    return Promise.reject(new Error(msg));
  }
};
