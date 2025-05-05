import axios from 'axios';

const oxios = axios.create({
  baseURL: 'http://ec2-18-117-154-8.us-east-2.compute.amazonaws.com:60001/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default oxios;