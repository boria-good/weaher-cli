import { IN_KEYS } from '../setup.js';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

export const getArguments = () => {
  return (
    yargs(hideBin(process.argv))
      .option(IN_KEYS.city, {
        alias: 'c',
        type: 'string',
        description: 'Your city',
      })
      .option(IN_KEYS.countryCode, {
        alias: 'k',
        type: 'string',
        description: 'Code country',
      })
      .option(IN_KEYS.lang, {
        alias: 'l',
        type: 'string',
        description: 'Language',
      })
      .option(IN_KEYS.token, {
        alias: 't',
        type: 'string',
        description: 'Your token or WEATHER_API_KEY=your_token weather',
      })
      .help().argv
  );
};
