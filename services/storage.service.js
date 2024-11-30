import * as Logger from './log.service.js';

import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

const STORAGE_SETUP_FILE_NAME = '.weather-data.setup.json';

const storagePath = join(homedir(), STORAGE_SETUP_FILE_NAME);

function isExistsStorageFile() {
  return promises
    .access(storagePath)
    .then(() => true)
    .catch(() => false);
}

export async function saveKeyValue(key, value) {
  if (typeof key !== 'string' || typeof value !== 'string') {
    new Error('Key and Value must be a string');
  }

  let data = {};

  if (await isExistsStorageFile()) {
    try {
      data = JSON.parse(await promises.readFile(storagePath, 'utf-8'));
    } catch {
      new Error('Storage file is not JSON format');
    }
  } else {
    Logger.printInfo('Creating new storage file');
  }

  if (!!data) {
    data[key] = value;
  }

  await promises
    .writeFile(storagePath, JSON.stringify(data))
    .then(() => {
      Logger.printSuccess('Data saved to storage file');
      Logger.printInfo(`Key: ${key}, Value: ${value}`);
    })
    .catch(() => {
      new Error('Error saving data to storage file');
    });
}

export async function getKeyValue(key) {
  if (await isExistsStorageFile()) {
    try {
      const data = JSON.parse(await promises.readFile(storagePath, 'utf-8'));

      if (data[key]) {
        return data[key];
      } else {
        new Error('Key not found');
      }
    } catch {
      new Error('Storage file is not JSON format');
    }
  } else {
    new Error('Storage file is not exists');
  }
}

export async function getDataByKeys(keys) {
  const data = JSON.parse(await promises.readFile(storagePath, 'utf-8'));
  return keys.map(key => data[key]);
}
