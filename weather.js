#!/usr/bin/env node

import * as Logger from './services/log.service.js';

import { IN_KEYS, STORAGE_SETUP_FILE_NAME } from './setup.js';
import { getDataByKeys, isExistsStorageFile, saveKeyValue } from './services/storage.service.js';
import { getLatLonByCityName, getWeather, setApiToken } from './services/api.service.js';

import { colorNames } from 'chalk';
import { getArguments } from './helpers/getArguments.js';

async function main() {
  const argsObject = getArguments();

  if (argsObject?.h) {
    Logger.printHelp(argsObject.h);
    process.exit(0);
  }

  for (const key in argsObject) {
    if (!!IN_KEYS[key]) {
      await saveKeyValue(IN_KEYS[key], argsObject[key]).catch(() => {
        Logger.printError('Error saving data to storage file');
      });
    }
  }

  if (!(await isExistsStorageFile())) {
    Logger.printError(`Storage file ${STORAGE_SETUP_FILE_NAME} not found`);
    Logger.printHelp();
    process.exit(1);
  }

  try {
    const keysObj = await getDataByKeys([IN_KEYS.city, IN_KEYS.token]);

    if (!keysObj[IN_KEYS.token]) {
      throw new Error('Token not found');
      process.exit(1);
    } else {
      setApiToken(keysObj[IN_KEYS.token]);
    }

    const arr = await getLatLonByCityName(keysObj[IN_KEYS.city], keysObj[IN_KEYS.countryCode]);
    if (!arr || !arr.length) {
      Logger.printError('City not found');
    } else {
      Logger.printSuccess('Found cities:');

      arr.forEach((cityData, index) => {
        Logger.printInfo(`${index + 1}. City: ${cityData.local_names[keysObj[IN_KEYS.lang] ?? 'en']}`);
        Logger.printWhite(`latitude: ${cityData.lat}, longitude: ${cityData.lon}`);
      });
    }
    Logger.printWeather(await getWeather({ ...keysObj, ...arr[0] }));
  } catch (err) {
    Logger.printError(err?.message);
    process.exit(1);
  }
}

main();
