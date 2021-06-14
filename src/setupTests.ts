import '@testing-library/jest-dom';
import 'whatwg-fetch';
import { rollbackDatabase } from './mocks/db';
import server from './mocks/server';

beforeAll(() => server.listen());

afterEach(() => {
	rollbackDatabase();
	jest.clearAllMocks();
	jest.restoreAllMocks();
	server.resetHandlers();
});

afterAll(() => server.close());
