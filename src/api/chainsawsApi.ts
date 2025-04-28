// src/Api/chainsaws.api.ts
import axiosInstance from './axiosInstance';

export interface Chainsaw {
  id: string;
  name: string;
  description: string;
  quantity: number;
  type: string;
  planId: string; // Cambiado a string | null para permitir valores nulos
}

// GET: Obtener todas las motosierras
export const getAllChainsaws = () => axiosInstance.get<Chainsaw[]>('/api/v1/chainsaws/all');

// POST: Crear una motosierra
export const createChainsaw = (data: Chainsaw) =>
  axiosInstance.post('/api/v1/chainsaws/create', {
    name: data.name,
    description: data.description,
    quantity: data.quantity,
    type: data.type,
  });

// PUT: Editar una motosierra por ID
export const updateChainsaw = (id: string, data: Chainsaw) =>
  axiosInstance.put(`/api/v1/chainsaws/edit/${id}`, data);

// GET: Buscar motosierras (envía body con filtros)
export const searchChainsaws = (criteria: Partial<Chainsaw>) =>
  axiosInstance.get<Chainsaw[]>('/api/v1/chainsaws/search', { params: criteria });
