import { CycleInterface } from 'interfaces/cycle';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface StationInterface {
  id?: string;
  location: string;
  company_id?: string;
  created_at?: any;
  updated_at?: any;
  cycle?: CycleInterface[];
  company?: CompanyInterface;
  _count?: {
    cycle?: number;
  };
}

export interface StationGetQueryInterface extends GetQueryInterface {
  id?: string;
  location?: string;
  company_id?: string;
}
