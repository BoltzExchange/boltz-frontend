import jest from 'jest';

export default {
  get: jest.fn(() => Promise.resolve({ data: {} })),
};
