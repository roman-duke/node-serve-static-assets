import * as fs from "fs";

const pathToFile = process.argv[2] || '/Users/donaldroman/Downloads/Proko Portrait Drawing Fundamentals/Portrait Drawing/18_drawing_morgan_1280x720.mp4';
const destinationPath = process.argv[3] || 'outputFile.mp4';

const readable = fs.createReadStream(pathToFile);
const writable = fs.createWriteStream(destinationPath);

fs.stat(pathToFile, (err, stats) => {
  const fileSize = stats.size;
  const fileArray = pathToFile.split('.');
  let counter = 1;
  let duplicate = '';

  try {
    duplicate = destinationPath + '/' + fileArray[0] + '_copy.' + fileArray.at(-1);
  } catch {
    console.error('Invalid file name!');
  }

  process.stdout.write(`File: ${duplicate} is being created`);

  readable.on("data", (chunk) => {
    const percentageCopied = ((chunk.length * counter) / fileSize) * 100;
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(`${Math.round(percentageCopied)}%`);
    counter += 1;
  });

  readable.on('error', (e) => {
    console.log('Unexpected error has occurred.', e);
  });

  readable.pipe(writable);

  writable.on('finish', () => {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write('Successfully created the file copy!');
  });
})
