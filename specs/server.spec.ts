import { expect } from 'chai';
import mockRequire from 'mock-require';
import sinon, { SinonSpy } from 'sinon';

describe(
  'server.ts',
  () => {
    let http: {
      createServer: SinonSpy,
    };
    let server: {
      listen: SinonSpy,
    };
    let app: string;

    before(
      () => {
        server = {
          listen: sinon.stub().callsFake((port, cb) => cb()),
        };
        http = {
          createServer: sinon.stub().returns(server),
        };

        mockRequire('http', http);

        app = Date.now().toString();
        mockRequire(require.resolve('../src/app'), {
          app,
        });

        require('../src/server');
      },
    );

    after(
      () => {
        mockRequire.stopAll();
        sinon.restore();
      },
    );

    it(
      'Should call http createServer',
      () => {
        sinon.assert.calledOnce(http.createServer);
      },
    );

    it(
      'Should pass correct app',
      () => {
        sinon.assert.calledWith(http.createServer, app);
      },
    );

    it(
      'Should call http.listen with correct values',
      () => {
        expect(server.listen.getCall(0).args[0]).to.be.equal(3000);
        expect(server.listen.getCall(0).args[1]).to.be.a('function');
      },
    );
  },
);
