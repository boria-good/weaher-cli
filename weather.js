#!/usr/bin/env node

import * as Logger from './services/log.service.js';

import { getDataByKeys, saveKeyValue } from './services/storage.service.js';

import { getArguments } from './helpers/getArguments.js';

async function main() {
  const argsObject = getArguments(process.argv);
  Logger.printInfo('Start Weather');

  if (argsObject?.h) {
    Logger.printHelp(argsObject.h);
    process.exit(0);
  }

  if (typeof argsObject?.city === 'string') {
    data['city'] = argsObject.city;
    await saveKeyValue('city', argsObject.city).catch(() => {
      Logger.printError('Error saving data to storage file');
    });
  }

  if (typeof argsObject?.token === 'string') {
    data['token'] = argsObject.token;
    await saveKeyValue('token', argsObject.token).catch(() => {
      Logger.printError('Error saving data to storage file');
    });
  }

  const [city, token] = await getDataByKeys(['city', 'token']).catch(err => {
    Logger.printError(`Error getting data from storage file: ${err}`);
  });

  Logger.printSuccess(city);
  Logger.printSuccess(token);
  Logger.printInfo('End Weather');
}

main();
