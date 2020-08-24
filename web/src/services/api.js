import axios from 'axios'

const api = axios.create({
    baseURL: 'https://novonet-test.herokuapp.com'
});

export default api;