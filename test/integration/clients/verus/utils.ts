import { Address } from '@chainify/types';
import { Chain } from '../../types';

export async function importVerusAddresses(chain: Chain) {
    const change = await chain.client.wallet.getAddresses(0, 200, true);
    const nonChange = await chain.client.wallet.getAddresses(0, 200, false);
    const all = [...nonChange, ...change].map((address) => address.address);
    const request = all.map((address) => ({ scriptPubKey: { address }, timestamp: 0 }));

    for (let i = 0; i < (request.length - 1); i++) {
        await chain.client.chain.sendRpcRequest('importaddress', [request[i].scriptPubKey.address, "", false]);
    }
    await chain.client.chain.sendRpcRequest('importaddress', [request[(request.length - 1)].scriptPubKey.address, "", true]);
}

export async function getRandomVerusAddress(chain: Chain): Promise<Address> {
    return chain.client.chain.sendRpcRequest('getnewaddress', []);
}
