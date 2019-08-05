import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-27f38.firebaseio.com/'
});

export default instance;