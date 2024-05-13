import { connect, set } from 'mongoose';

export default function (mongodbURL) {
  return new Promise(function (resolve, reject) {
    // Set mongoose properties
    set('strictQuery', true);

    // Connect
    // eslint-disable-next-line
    connect(mongodbURL, {
      keepAlive: true,
      loggerLevel: 'debug'
    }, function (err) {
      if (err) { reject(err); }
      resolve('Connected to MongoDB');
    });
  });
}