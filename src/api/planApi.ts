import { AxiosResponse } from 'axios';
import httpAxios from './axiosInstance';
import { Plan } from '../interfaces/plan.interface';

const BASE_API = "/api/v1";

export const listPlanService = (): Promise<{ data: Plan[], status: number, errors?: any }> => {

   return new Promise((resolve) => {
      httpAxios.get(`${BASE_API}/plans/all`).then(response => {
         resolve(response);
      }).catch(error => { resolve(error.response); });
   });
};


export const createPlanService = (objReq: any): Promise<AxiosResponse> => {

   return new Promise((resolve) => {
      httpAxios.post(`${BASE_API}/plans/create`, objReq).then(response => {
         resolve(response);
      }).catch(error => { resolve(error.response); });
   });
};

export const updatePlanService = (objReq: any): Promise<AxiosResponse> => {

   return new Promise((resolve) => {
      httpAxios.put(`${BASE_API}/plans/edit`, objReq).then(response => {
         resolve(response);
      }).catch(error => { resolve(error.response); });
   });
};

export const updateStatusPlanService = (objReq: any): Promise<AxiosResponse> => {

   return new Promise((resolve) => {
      httpAxios.put(`${BASE_API}/plans/updateStatus`, objReq).then(response => {
         resolve(response);
      }).catch(error => { resolve(error.response); });
   });
};

export const getPlanService = (id: string): Promise<{ data: Plan, status: number, errors?: any }> => {

   return new Promise((resolve) => {
      httpAxios.get(`${BASE_API}/plans/search?id=${id}`).then(response => {
         resolve(response);
      }).catch(error => { resolve(error.response); });
   });
};

export const searchStatusPlanService = (status: string): Promise<{ data: Plan[], status: number, errors?: any }> => {

   return new Promise((resolve) => {
      httpAxios.get(`${BASE_API}/plans/search_validated?status=${status}`).then(response => {
         resolve(response);
      }).catch(error => { resolve(error.response); });
   });
};