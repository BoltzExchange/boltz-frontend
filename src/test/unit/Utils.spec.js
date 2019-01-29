import { splitPairId } from '../../scripts/utils';
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('Utils', () => {
  it('split pair id', () => {
    const split = splitPairId('BTC/LTC');
    split.should.be.a('object');
    split.should.have.property('base').that.is.a('string');
    split.should.have.property('quote').that.is.a('string');
    expect(split.base).to.equal('BTC');
    expect(split.quote).to.equal('LTC');
  });
});
