import ky from 'ky'
//baseURL: 'http://177.39.16.76:8405',
export const api = ky.create({
  prefixUrl: 'http://45.70.40.98:3718'
  //prefixUrl: 'https://localhost:7286',
  //prefixUrl: 'http://177.39.16.76:8407',
})