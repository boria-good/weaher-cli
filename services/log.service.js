import chalk from 'chalk';
import dedent from 'dedent';

const HELP_MESSAGE = dedent`\nuse this format:
Options:
      --version       Show version number                              [boolean]
  -c, --city          Your city                                        [string]
  -k, --country-code  Code country                                     [string]
  -t, --token         "Your token" or
	                     "WEATHER_API_KEY=your_token weather"             [string]

 	-h, --help          Show help `;

export const printError = error => {
  console.log(chalk.bgRed('\n ERROR: '), chalk.red(error));
};

export const printSuccess = str => {
  console.log(chalk.bgGreen('\n SUCCESS: '), chalk.white(str));
};

export const printInfo = str => {
  console.log(chalk.bgBlue('\n INFO: '), chalk.white(str));
};

export const printWhite = str => {
  console.log(chalk.whiteBright(str));
};

export const printHelp = () => {
  console.log(chalk.bgYellowBright('\n Help '), HELP_MESSAGE);
};

export const printWeather = obj => {
  console.log(chalk.bgGreen(`\n Weather for ${obj.name}: ${' '.repeat(40)}\n`));
  console.log(
    chalk.bgBlue(` Coordination: `),
    chalk.white(`latitude: ${obj.coord.lat}, longitude:  ${obj.coord.lon}\n`)
  );
  console.log(chalk.bgBlue(` Temperature: ${obj.temp}°C `), chalk.white(`${obj.weather.description}\n`));

  console.log(chalk.bgBlue(` Clouds: `), chalk.white(`${obj.clouds.all}%\n`));
  console.log(chalk.bgBlue(` Wind: `), chalk.white(`speed:\t\t${obj.wind.speed} m/s`));
  console.log(chalk.white(`\tdirection:\t${obj.wind.deg}˚\n\tgust:\t\t${obj.wind.gust}m/s`));
};
