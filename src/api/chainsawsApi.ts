// src/api/chainsawsApi.ts
import axiosInstance from './axiosInstance';

export interface Chainsaw {
  id: string;
  name: string;
  description: string;
  quantity: number;
  type: string;
  planId: string;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
}

// Obtener todas las motosierras
export const getAllChainsaws = () => axiosInstance.get<Chainsaw[]>('/api/v1/chainsaws/all');

// Crear una nueva motosierra
export const createChainsaw = (data: Chainsaw) =>
  axiosInstance.post('/api/v1/chainsaws/create', {
    name: data.name,
    description: data.description,
    quantity: data.quantity,
    type: data.type,
    planId: data.planId, 
  });

// Actualizar una motosierra existente
export const updateChainsaw = (id: string, data: Chainsaw) =>
  axiosInstance.put(`/api/v1/chainsaws/edit/${id}`, data);

// Buscar motosierras según criterios
export const searchChainsaws = (criteria: Partial<Chainsaw>) =>
  axiosInstance.get<Chainsaw[]>('/api/v1/chainsaws/search', { params: criteria });

// Obtener todos los planes
export const getAllPlans = () => axiosInstance.get<Plan[]>('/api/v1/plans/all');
