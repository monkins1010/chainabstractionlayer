import { NodeProvider, AxiosResponse } from '@liquality/node-provider';
export default class JsonRpcProvider extends NodeProvider {
    constructor(uri: string, username?: string, password?: string);
    _prepareRequest(method: string, params: any[]): {
        id: number;
        method: string;
        jsonrpc: string;
        params: any[];
    };
    _parseResponse(_data: AxiosResponse): any;
    jsonrpc(method: string, ...params: any[]): Promise<any>;
}
