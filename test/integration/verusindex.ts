import { Logger, LogLevel } from '@chainify/logger';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { shouldBehaveLikeVerusClient } from './clients/verus';



chai.use(chaiAsPromised);

// turn off the logger for the tests
Logger.setLogLevel(LogLevel.OFF);

describe('Integration tests', function () {

    describe('Clients', () => {
        shouldBehaveLikeVerusClient();
    });

});
