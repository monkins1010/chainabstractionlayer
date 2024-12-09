import { Logger, LogLevel } from '@chainify/logger';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
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
        shouldBehaveLikeVerusClient();
    });


    after(async () => {
        await stopLocalNetworks();
    });
});
