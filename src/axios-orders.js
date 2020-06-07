import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-app-bc3d2.firebaseio.com/',
});

export default instance;
