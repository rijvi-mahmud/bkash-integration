import axios from 'axios';

export default async function fetch({ method, url, headers, data }) {
  try {
    return (await axios({ url, method, headers, data }))?.data;
  } catch (e) {
    throw new Error(e?.message);
  }
}
