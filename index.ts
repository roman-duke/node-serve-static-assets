import * as fs from "fs";

const pathToFile = process.argv[2] || '/Users/donaldroman/Downloads/Proko Portrait Drawing Fundamentals/Portrait Drawing/18_drawing_morgan_1280x720.mp4';
const destinationPath = process.argv[3] || 'outputFile';

console.time('file operation');
fs.readFile(pathToFile, (err, data) => {
  if (err) throw err;
  console.log(data);

  fs.writeFile(destinationPath, data, (err) => {
    if (err) throw err;

    console.timeEnd('file operation');
  });

  console.log("New file has been created");
});
