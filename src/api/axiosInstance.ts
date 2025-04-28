import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://ec2-18-117-154-8.us-east-2.compute.amazonaws.com:60001', // Cambia esto a la URL de tu API
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;