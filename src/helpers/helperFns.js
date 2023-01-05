import { TIMEOUT_SEC } from './config.js';

const timeout = (s) => {
  return new Promise((_, reject) => {
    return setTimeout(() => {
      return reject(
        `Request is taking too long to respond. More than ${s} seconds...`
      );
    }, s * 1000);
  });
};

export const getJson = async (url, errMsg = 'Something went wrong...') => {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    if (!response.ok) {
      throw new Error(`${errMsg} ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};
