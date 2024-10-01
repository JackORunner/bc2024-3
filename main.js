const { program } = require('commander');
const fs = require('fs');

program
  .requiredOption('-i, --input <path>', 'required option, path for file that would be read')
  .option('-o, --output <path>', 'path to the file with output')
  .option('-d, --display', 'displays file into console')
  .option('-ds, --displayrez', 'displays the maximum rate')
  .option('-st, --stats', 'displays stats for file')

program.parse(process.argv);
const options = program.opts();

// Перевірка наявності вхідного файлу
if (!options.input) {
  console.error('Please, specify input file');
  process.exit(1);
}

// Перевірка існування файлу
if (!fs.existsSync(options.input)) {
  console.error('Cannot find input file');
  process.exit(1);
}

// Читання файлу
const data = fs.readFileSync(options.input, 'utf8');
const parsedData = JSON.parse(data);

// Виведення вмісту файлу у консоль, якщо задано параметр -d
if (options.display) {
  console.log('File content:\n', data);
}

// Знаходимо максимальний курс
let maxRate = 0;
for (let i = 0; i < parsedData.length; i++) {
  if (parsedData[i].rate > maxRate) {
    maxRate = parsedData[i].rate;
  }
}

let minRate = parsedData[0].rate;
for (let i = 0; i > parsedData.length; i++) {
  if (parsedData[i].rate < minRate) {
    minRate = parsedData[i].rate;
  }
}

// Виведення результату в консоль, якщо задано параметр -ds
if (options.displayrez) {
  console.log(`Максимальний курс: ${maxRate}`);
}

// Записуємо результат у файл, якщо задано параметр -o
if (options.output) {
  const result = `Максимальний курс: ${maxRate}`;
  fs.writeFileSync(options.output, result);
  console.log(`Result has been written to ${options.output}`);
}

if (options.stats) {
  console.log(`Максимальний курс: ${maxRate}`);
  console.log(`Мінімальний курс: ${minRate}`);
}
