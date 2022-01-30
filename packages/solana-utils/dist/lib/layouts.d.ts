declare class Assignable {
    [key: string]: any;
    constructor(properties: any);
}
export declare class Template extends Assignable {
}
export declare const initSchema: Map<typeof Template, {
    kind: string;
    fields: string[][];
}>;
export interface InitData {
    buyer: string;
    seller: string;
    secret_hash: string;
    expiration: number;
    value: number;
}
export declare const claimSchema: Map<typeof Template, {
    kind: string;
    fields: string[][];
}>;
export declare const refundSchema: Map<typeof Template, {
    kind: string;
    fields: string[][];
}>;
export {};
