import axios from 'axios';

const API_URL = 'https://worki-app-885e460b0fc2.herokuapp.com/';

export const client = axios.create({
  baseURL: API_URL,
});