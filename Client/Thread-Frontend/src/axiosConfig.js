import axios from 'axios';

const instance = axios.create({
    baseURL: "https://thread-project.onrender.com/api/v1",
    withCredentials: true
})

export default instance;