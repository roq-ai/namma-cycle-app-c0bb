import axios from 'axios';
import queryString from 'query-string';
import { StationInterface, StationGetQueryInterface } from 'interfaces/station';
import { GetQueryInterface } from '../../interfaces';

export const getStations = async (query?: StationGetQueryInterface) => {
  const response = await axios.get(`/api/stations${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createStation = async (station: StationInterface) => {
  const response = await axios.post('/api/stations', station);
  return response.data;
};

export const updateStationById = async (id: string, station: StationInterface) => {
  const response = await axios.put(`/api/stations/${id}`, station);
  return response.data;
};

export const getStationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/stations/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteStationById = async (id: string) => {
  const response = await axios.delete(`/api/stations/${id}`);
  return response.data;
};
