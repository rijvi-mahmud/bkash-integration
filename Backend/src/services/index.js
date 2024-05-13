import bkash from './bkash/bkash';
import user from './user/user';

export const services = (app) => {
  app.configure(bkash);
  app.configure(user)
};