import { expect } from 'chai';
import mockRequire from 'mock-require';
import sinon, { SinonSpy, SinonStub } from 'sinon';

describe(
  'server.ts',
  () => {
    let corsStub: SinonStub;
    let corsReturn: string;

    interface ExpressMock {
      (): { use: SinonSpy },
      json: SinonSpy
    }

    let express: ExpressMock;
    let jsonStub: SinonStub;
    let jsonReturn: string;

    let useSpy: SinonSpy;

    let morganStub: SinonStub;
    let morganReturn: string;

    before(
      () => {
        corsReturn = Date.now().toString();
        corsStub = sinon.stub().returns(corsReturn);
        mockRequire('cors', corsStub);

        useSpy = sinon.spy();
        express = function() {
          return { use: useSpy };
        } as ExpressMock;

        jsonReturn = Date.now().toString();
        jsonStub = sinon.stub().returns(jsonReturn);
        express.json = jsonStub;

        mockRequire('express', express);

        morganReturn = Date.now().toString();
        morganStub = sinon.stub().returns(morganReturn);
        mockRequire('morgan', morganStub);

        require('../src/app');
      },
    );

    after(
      () => {
        mockRequire.stopAll();
        sinon.restore();
      },
    );

    it(
      'Should call use express',
      () => {
        sinon.assert.calledThrice(useSpy);
      },
    );

    it(
      'Should call json and use on app',
      () => {
        sinon.assert.calledOnce(jsonStub);
        expect(jsonReturn).to.be.equal(useSpy.getCall(0).args[0]);
      },
    );

    it(
      'Should call cors and use on app',
      () => {
        sinon.assert.calledOnce(corsStub);
        expect(corsReturn).to.be.equal(useSpy.getCall(1).args[0]);
      },
    );

    it(
      'Should call morgan and use on app',
      () => {
        sinon.assert.calledWith(morganStub, 'tiny');
        expect(morganReturn).to.be.equal(useSpy.getCall(2).args[0]);
      },
    );
  },
);
