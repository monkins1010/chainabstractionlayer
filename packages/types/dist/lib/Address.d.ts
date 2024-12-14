export declare class Address {
    address: string;
    derivationPath?: string;
    publicKey?: string;
    privateKey?: string;
    name?: string;
    constructor(fields?: {
        address: string;
        derivationPath?: string;
        publicKey?: string;
        privateKey?: string;
        name?: string;
    });
    toString: () => string;
}
export type AddressType = Address | string;
