const SVGFixer = require("oslllo-svg-fixer");
const path = require("path");
const fs = require("fs");

const dirs = ["outline", "regular", "sharp"];

async function main() {
  for (let part of dirs) {
    await SVGFixer(
      path.join(__dirname, "ionicons.designerpack", part),
      path.join(__dirname, "ionicons.designerpack", part + "-fixed"),
      {
        showProgressBar: true,
        throwIfDestinationDoesNotExist: false,
      }
    ).fix();
  }
}

async function typeGenerator() {
  let list = [];
  for (let part of dirs) {
    fs.readdirSync(
      path.join(__dirname, "ionicons.designerpack", part + "-fixed")
    ).forEach((file) => {
      list = list.concat(file.split(".")[0]);
    });
  }
  const str = list.map((key) => `"${key}"`).join(" | ");
  fs.writeFileSync("IconType.tsx", `export type IconType = ${str};`);
}

// main().then(() => console.log("Done"));
typeGenerator().then(() => console.log("Done"));
