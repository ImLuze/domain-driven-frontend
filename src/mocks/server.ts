import { setupServer } from 'msw/node';
import handlers from './handlers';

/**
 * This allows us to mock API calls in integration tests.
*/

export default setupServer(...handlers);
