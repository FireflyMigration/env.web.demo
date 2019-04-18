import { DataProviderFactory, RestDataProvider } from 'radweb';

export class headerInteceptorClass {
    addRequestHeader: (add: (name: string, value: string) => void) => void;


}

const headerInteceptor = new headerInteceptorClass();
export const shared = {
    dataSource: new RestDataProvider('/dataapi', (add: (name: string, value: string) => void)=> {
        if (headerInteceptor.addRequestHeader)
            headerInteceptor.addRequestHeader(add);
    }) as DataProviderFactory,
    headerInteceptor
};