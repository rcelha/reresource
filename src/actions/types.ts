export interface ServiceReturn {
  data: object;
  meta?: object;
}

export type ServiceFunction = (
  serviceParameters: ServiceOptions
) => Promise<ServiceReturn>;

export interface ResourceOptions {
  append?: boolean;
  ignoreCache?: boolean;
  cached?: boolean;
}

export interface ServiceOptions {
  id?: string | number;
  [propName: string]: any; // tslint:disable-line:no-any
}

export interface ResourceAction {
  type: string;
  resourceType: string;
  payload: {
    serviceFunction: ServiceFunction;
    serviceParameters: ServiceOptions;
    resourceOptions: ResourceOptions;
  };
}

export interface ResourceSuccessAction {
  type: string;
  resourceType: string;
  payload: {
    data: object | [object];
    meta?: object;
    serviceParameters: ServiceOptions;
    resourceOptions: ResourceOptions;
  };
}

export interface ResourceFailureAction {
  type: string;
  resourceType: string;
  payload: {
    error: Error;
    serviceParameters: ServiceOptions;
    resourceOptions: ResourceOptions;
  };
}
