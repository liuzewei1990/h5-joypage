const moment = require("moment");
const runTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

const fs = require("fs");

fs.writeFile("./build-time.js", `export default "${runTime}";\r`, {}, function () {});
