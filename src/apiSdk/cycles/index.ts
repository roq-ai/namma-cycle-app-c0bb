import axios from 'axios';
import queryString from 'query-string';
import { CycleInterface, CycleGetQueryInterface } from 'interfaces/cycle';
import { GetQueryInterface } from '../../interfaces';

export const getCycles = async (query?: CycleGetQueryInterface) => {
  const response = await axios.get(`/api/cycles${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCycle = async (cycle: CycleInterface) => {
  const response = await axios.post('/api/cycles', cycle);
  return response.data;
};

export const updateCycleById = async (id: string, cycle: CycleInterface) => {
  const response = await axios.put(`/api/cycles/${id}`, cycle);
  return response.data;
};

export const getCycleById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/cycles/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCycleById = async (id: string) => {
  const response = await axios.delete(`/api/cycles/${id}`);
  return response.data;
};
