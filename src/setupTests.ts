import '@testing-library/jest-dom';
import 'whatwg-fetch';
import server from './mocks/server';

beforeAll(() => server.listen());

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
  server.resetHandlers();
});

afterAll(() => server.close());
