import chalk from 'chalk';
import dedent from 'dedent';

export const printError = error => {
  console.log(chalk.bgRed('\n ERROR: '), chalk.red(error));
};

export const printSuccess = str => {
  console.log(chalk.bgGreen('\n SUCCESS: '), chalk.white(str));
};

export const printInfo = str => {
  console.log(chalk.bgBlue('\n INFO: '), chalk.white(str));
};

export const printHelp = () => {
  console.log(
    chalk.bgYellowBright('\n Help: '),
    dedent`use this format\n	--city, -c: Your city\n	--token, -t: Your token\n	--help, -h print this help page
	`
  );
};
