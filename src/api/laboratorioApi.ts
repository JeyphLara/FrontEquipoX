import axios from 'axios';

const laboratorioApi = axios.create({
  baseURL: 'http://ec2-18-117-154-8.us-east-2.compute.amazonaws.com:60001/api/v1', 
});

export default laboratorioApi;
