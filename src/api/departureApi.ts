// src/api/chainsawsApi.ts
import axiosInstance from './axiosInstance';

export interface departure {
    id: string;
    departure_date: string;
}


// Obtener todas las ordenes
export const getDepartureOrders = () => axiosInstance.get<departure[]>('/api/v1/orders/all');

// Crear una nueva ordenes
export const createOrder = (data: departure) =>
    axiosInstance.post('/api/v1/orders/create', {
        departure_date: data.departure_date,
    });

// Actualizar una ordenes existente
export const updateOrder = (id: string, data: departure) =>
    axiosInstance.put(`/api/v1/orders/edit?id=${id}`, data);

// Buscar ordenes según criterios
export const searchOrders = (id: string) =>
    axiosInstance.get<departure[]>(`/api/v1/orders/search?id=${id}`);

