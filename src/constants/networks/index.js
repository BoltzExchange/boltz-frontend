import { networks } from 'bitcoinjs-lib';

const bitcoinPrefix = '\\x18Bitcoin Signed Message:\n';
const litecoinPrefix = '\\x19Litecoin Signed Message:\n';

const testnetBip32 = {
  private: 0x019d9cfe,
  public: 0x019da462,
};

const simnetBip32 = {
  private: 0x488b21e,
  public: 0x420bd3a,
};

const Networks = {
  // Bitcoin networks
  bitcoinMainnet: networks.bitcoin,
  bitcoinTestnet: networks.testnet,
  bitcoinSimnet: {
    messagePrefix: bitcoinPrefix,
    bip32: simnetBip32,
    bech32: 'sb',
    scriptHash: 0x7b,
    pubKeyHash: 0x3f,
    wif: 0x64,
  },
  bitcoinRegtest: {
    messagePrefix: bitcoinPrefix,
    bip32: testnetBip32,
    bech32: 'bcrt',
    scriptHash: 0xc4,
    pubKeyHash: 0x6f,
    wif: 0xef,
  },

  // Litecoin networks
  litecoinMainnet: {
    messagePrefix: litecoinPrefix,
    bip32: {
      private: 0x488ade4,
      public: 0x488b21e,
    },
    bech32: 'ltc',
    scriptHash: 0x32,
    pubKeyHash: 0x30,
    wif: 0xb0,
  },
  litecoinTestnet: {
    messagePrefix: litecoinPrefix,
    bip32: testnetBip32,
    bech32: 'tltc',
    scriptHash: 0x3a,
    pubKeyHash: 0x6f,
    wif: 0xef,
  },
  litecoinSimnet: {
    messagePrefix: bitcoinPrefix,
    bip32: simnetBip32,
    bech32: 'sltc',
    scriptHash: 0x7b,
    pubKeyHash: 0x3f,
    wif: 0x64,
  },
  litecoinRegtest: {
    messagePrefix: litecoinPrefix,
    bip32: testnetBip32,
    bech32: 'tltc',
    scriptHash: 0xc4,
    pubKeyHash: 0x6f,
    wif: 0xef,
  },
};

export default Networks;
