const TIMEOUT_SEC = 10;

const timeout = (s) => {
  return new Promise((_, reject) => {
    return setTimeout(() => {
      return reject(
        `Request is taking too long to respond. More than ${s} seconds...`
      );
    }, s * 1000);
  });
};
