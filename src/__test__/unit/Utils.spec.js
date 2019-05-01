/* eslint-disable no-undef */
import * as utils from '../../utils';
import {
  bitcoinNetwork,
  litecoinNetwork,
  bitcoinExplorer,
  litecoinExplorer,
  bitcoinAddress,
  litecoinAddress,
  litecoinInvoice,
  bitcoinInvoice,
} from '../../constants';

describe('Utils', () => {
  it('should have corect decimals value', () => {
    expect(utils.decimals).toBe(100000000);
  });

  it('should convert string to hex', () => {
    const input = 'boltz';
    expect(utils.getHexString(input)).toBe(input.toString('hex'));
  });

  it('should covert string hex to buffer', () => {
    const hex = utils.getHexString('Hello');
    const buffer = Buffer.from(hex, 'hex');
    expect(utils.getHexBuffer(hex)).toEqual(buffer);
  });

  it('should split pair id', () => {
    const pairId = 'BTC/LTC';
    expect(utils.splitPairId(pairId)).toEqual({
      base: 'BTC',
      quote: 'LTC',
    });
  });

  it('should round amount to 8 decimals', () => {
    const number = 0.001;
    expect(utils.roundWholeCoins(number)).toBe(0.001);
  });

  it('should convert satoshis / litoshis to whole coins', () => {
    const sat = 0.001;
    const fixed = num => Number(num.toFixed(8));
    expect(utils.toWholeCoins(sat)).toBe(fixed(sat / utils.decimals));
  });

  it('should convert whole coins into satoshis / litoshis', () => {
    const coins = 2;
    expect(utils.toSatoshi(coins)).toBe(Math.floor(coins * utils.decimals));
  });

  it('should return currency name from symbol', () => {
    expect(utils.getCurrencyName('LTC')).toBe('Litecoin');
    expect(utils.getCurrencyName('BTC')).toBe('Bitcoin');
  });

  it('should get the name of the smallest denomination of a currency', () => {
    expect(utils.getSmallestDenomination('BTC')).toBe('satoshis');
    expect(utils.getSmallestDenomination('LTC')).toBe('litoshis');
  });

  it('should get network for symbol', () => {
    expect(utils.getNetwork('BTC')).toEqual(bitcoinNetwork);
    expect(utils.getNetwork('LTC')).toEqual(litecoinNetwork);
  });

  it('should get explorer for symbol', () => {
    expect(utils.getExplorer('BTC')).toBe(bitcoinExplorer);
    expect(utils.getExplorer('LTC')).toBe(litecoinExplorer);
  });

  it('should get sample address', () => {
    expect(utils.getSampleAddress('BTC')).toBe(bitcoinAddress);
    expect(utils.getSampleAddress('LTC')).toBe(litecoinAddress);
  });

  it('should get sample invoice', () => {
    expect(utils.getSampleInvoice('BTC')).toBe(bitcoinInvoice);
    expect(utils.getSampleInvoice('LTC')).toBe(litecoinInvoice);
  });

  it('should generate noticifaction template', () => {
    const temaplte = {
      title: 'boltz-title',
      message: 'boltz-message',
    };
    const type = 0;
    const notifi = utils.notificationData(temaplte, type);

    expect(notifi).toHaveProperty('message', temaplte.message);
    expect(notifi).toHaveProperty('title', temaplte.title);
    expect(notifi).toHaveProperty('type');
    expect(notifi.dismiss.duration).toBeGreaterThan(0);
    expect(notifi.dismissable.click).toBe(true);
  });
});
