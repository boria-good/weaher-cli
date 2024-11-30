import * as Logger from './log.service.js';

import { STORAGE_SETUP_FILE_NAME } from '../setup.js';
import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

const storagePath = join(homedir(), STORAGE_SETUP_FILE_NAME);

export function isExistsStorageFile() {
  return promises
    .access(storagePath)
    .then(() => true)
    .catch(() => false);
}

export async function saveKeyValue(key, value) {
  if (typeof key !== 'string' || typeof value !== 'string') {
    throw new Error('Key and Value must be a string');
  }

  let data = {};

  if (await isExistsStorageFile()) {
    try {
      data = JSON.parse(await promises.readFile(storagePath, 'utf-8'));
    } catch (err) {
      throw new Error(err);
    }
  } else {
    Logger.printInfo('Creating new storage file');
  }

  data[key] = value;

  await promises
    .writeFile(storagePath, JSON.stringify(data))
    .then(() => {
      Logger.printInfo(`Saved: Key: ${key}, Value: ${value}`);
    })
    .catch(err => {
      throw new Error(err);
    });
}

export async function getKeyValue(key) {
  try {
    const data = JSON.parse(await promises.readFile(storagePath, 'utf-8'));

    if (data[key]) {
      return data[key];
    }

    return null;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getDataByKeys(keys) {
  const data = JSON.parse(await promises.readFile(storagePath, 'utf-8'));

  if (process.env?.WEATHER_API_KEY) {
    data['token'] = process.env.WEATHER_API_KEY;
  }
  return data;
}
