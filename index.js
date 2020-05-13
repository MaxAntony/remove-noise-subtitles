#!/usr/bin/env node

const args = process.argv;
const directory = process.env.PWD;

const fs = require("fs");
const path = require("path");

fs.readdir(directory, (err, files) => {
  if (err) throw new Error("Error reading files");
  let srtFiles = [];
  files.forEach((e) => {
    if (e.endsWith(".srt")) {
      srtFiles.push(e);
    }
  });
  srtFiles.forEach((e) => {
    fs.readFile(path.join(directory, e), (err, data) => {
      let content = data.toString();
      const replaced = content.replace(/\n[0-9]\r\n/g, "\n");
      const replaced2 = replaced.replace(/\n[0-9][0-9]\r\n/g, "\n");
      const replaced3 = replaced2.replace(/\n[0-9][0-9][0-9]\r\n/g, "\n");
      fs.writeFile(path.join(directory, e), replaced3, (err) => {
        if (err) {
          throw new Error("error al escribir en el archivo");
        }
      });
      // console.log(replaced3);
      // console.log(content);
    });
  });
});
