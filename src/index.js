#!/usr/bin/env node

// TODO: que se conserven los archivos antiguos como un backup con otro nombre
// TODO: permitir laa opcion de revertir los cambio usando elarchivo de backup mediante un flag
// TODO: que haya una opcion de eliminar los backups mediante un flag
// TODO: que se pueda buscar recursivamente en una carpeta y esto debe ser controlado por un flag

const fs = require('fs');
const path = require('path');

// const args = process.argv;
const directory = process.env.PWD;

fs.readdir(directory, (err, files) => {
  if (err) throw new Error('Error reading directory');
  const srtFiles = [];
  files.forEach((e) => {
    if (e.endsWith('.srt')) {
      srtFiles.push(e);
    }
  });
  srtFiles.forEach((e) => {
    fs.readFile(path.join(directory, e), (errReading, data) => {
      if (errReading) throw new Error('error reading files');
      let content = data.toString();
      // TODO: buscar una mejor forma de optimizar el reemplazo
      content = content.replace(/\n[0-9]\r\n/g, '\n');
      content = content.replace(/\n[0-9][0-9]\r\n/g, '\n');
      content = content.replace(/\n[0-9][0-9][0-9]\r\n/g, '\n');
      fs.writeFile(path.join(directory, e), content, (errWriting) => {
        // TODO: que cuando un error salga todos lo cambios se descarten
        if (errWriting) throw new Error(`error writing file ${e}`);
      });
    });
  });
});
