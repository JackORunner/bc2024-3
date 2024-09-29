const {program} = require('commander');
const fs = require('fs');

program
    .requiredOption('-i, --input <path>', 'required option, path for file that would be readed')
    .option('-o, --output <path>', ' path to the file with output')
    .option('-d, --display', ' displays file into console')

program.parse(process.argv);

const options = program.opts();

if (!options.input) {
    console.error('Please, specify input file');
    process.exit(1);
  };

if (!fs.existsSync(options.input)) {
    console.error('Cannot find input file');
    process.exit(1);
  };

if (!options.output && !options.display) {
    process.exit(0);
};

const data = fs.readFileSync(options.input, 'utf8');


if (options.display) {
  console.log('File content:\n', data);
}

if (options.output) {
  fs.writeFileSync(options.output, data);
  console.log(`File has been written to ${options.output}`);
}

