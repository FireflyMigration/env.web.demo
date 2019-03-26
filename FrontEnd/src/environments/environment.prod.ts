import { DataProviderFactory, RestDataProvider } from 'radweb';


export const environment = {
  production: true,
  dataSource : new RestDataProvider('/dataapi') as DataProviderFactory
};
