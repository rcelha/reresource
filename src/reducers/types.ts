export interface StructuredResource {
  loading: boolean;
  cached: boolean;
  initialized: boolean;
  data: object | null;
  meta: object | null;
  error: Error | null;
}
