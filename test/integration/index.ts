import { Logger, LogLevel } from '@liquality/logger';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { shouldBehaveLikeBitcoinClient } from './clients/bitcoin';
import { shouldBehaveLikeEvmClient } from './clients/evm';
import { shouldBehaveLikeNearClient } from './clients/near';
import { shouldBehaveLikeSolanaClient } from './clients/solana';
import { shouldBehaveLikeTerraClient } from './clients/terra';
import { shouldBehaveLikeVerusClient } from './clients/verus';
import { startLocalNetworks, stopLocalNetworks } from './environment';

chai.use(chaiAsPromised);

// turn off the logger for the tests
Logger.setLogLevel(LogLevel.OFF);

describe('Integration tests', function () {
    before(async () => {
        await startLocalNetworks();
    });

    describe('Clients', () => {
        shouldBehaveLikeEvmClient();
        shouldBehaveLikeBitcoinClient();
        shouldBehaveLikeNearClient();
        shouldBehaveLikeTerraClient();
        shouldBehaveLikeSolanaClient();
        shouldBehaveLikeVerusClient();
    });

    after(async () => {
        await stopLocalNetworks();
    });
});
