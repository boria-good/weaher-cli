import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

export const getArguments = args => {
  return yargs(hideBin(process.argv))
    .option('city', {
      alias: 'c',
      type: 'string',
      description: 'Your city',
    })
    .option('token', {
      alias: 't',
      type: 'string',
      description: 'Your token',
    })
    .option('help', {
      alias: 'h',
      type: 'boolean',
      description: 'This text',
    })
    .help().argv;
};
