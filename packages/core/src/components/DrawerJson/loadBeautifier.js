import * as utils from "@work/utils";

export default async function loadBeautifier() {
  try {
    const url = "https://lib.baomitu.com/js-beautify/1.13.5/beautifier.min.js";
    await utils.load.loadScript(url);
  } catch (error) {
    throw "beautifier load fail";
  }
}
