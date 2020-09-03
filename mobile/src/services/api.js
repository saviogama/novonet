import axios from 'axios';

const api = axios.create({
    baseURL: 'http://186.251.103.59:3333'
});

export default api;