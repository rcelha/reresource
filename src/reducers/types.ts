import { DataType } from '../types';

export interface StructuredResource {
  loading: boolean;
  cached: boolean;
  initialized: boolean;
  data: DataType[] | DataType | null;
  meta: object | null;
  error: Error | null;
  [k: string]: any;
}
