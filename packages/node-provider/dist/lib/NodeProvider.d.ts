import { Provider } from '@liquality/provider';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
export default class NodeProvider extends Provider {
    _node: AxiosInstance;
    constructor(config: AxiosRequestConfig);
    _handleNodeError(e: Error, context: any): void;
    nodeGet(url: string, params?: any): Promise<any>;
    nodePost(url: string, data: any): Promise<any>;
}
