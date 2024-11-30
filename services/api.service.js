import * as Logger from './log.service.js';

import axios from 'axios';

let _API_TOKEN;
const _BASE_URL = 'http://api.openweathermap.org';

export function setApiToken(apiToken) {
  _API_TOKEN = _API_TOKEN ?? apiToken;
}

const config = {
  method: 'get',
  baseURL: _BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 1000,
};

/* Getting weather data by city name */
export async function getWeather(arg) {
  const { lang, lat, lon } = arg;

  if (!_API_TOKEN) {
    new Promise.reject('Token not found');
  }
  const url = '/data/2.5/weather';
  const params = {
    appid: _API_TOKEN,
    units: 'metric',
    lang,
    lat,
    lon,
  };

  try {
    const {
      data: { weather, coord, wind, clouds, name, main },
    } = await axios({ ...config, url, params });

    return { weather: weather[0], coord, wind, clouds, name, temp: main?.temp };
  } catch (err) {
    Logger.printError(err?.message);
  }
}

/* Getting
 * lat (latitude)
 * lon (longitude)
 */
export async function getLatLonByCityName(cityName, countryCode) {
  if (!_API_TOKEN) {
    new Promise.reject('Token not found');
  }

  if (!cityName) {
    new Promise.reject('City Name not defined');
  }
  const CONFIG = {
    ...config,
    url: 'geo/1.0/direct',
    params: {
      appid: _API_TOKEN,
      q: `${cityName},${countryCode && countryCode}`,
      limit: 5,
      units: 'metric',
      lang: 'uk',
    },
  };

  try {
    const res = await axios(CONFIG);

    return res.data;
  } catch (err) {
    Logger.printError(err?.message);
  }
}
