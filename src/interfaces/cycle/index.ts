import { StationInterface } from 'interfaces/station';
import { GetQueryInterface } from 'interfaces';

export interface CycleInterface {
  id?: string;
  status: string;
  station_id?: string;
  created_at?: any;
  updated_at?: any;

  station?: StationInterface;
  _count?: {};
}

export interface CycleGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  station_id?: string;
}
