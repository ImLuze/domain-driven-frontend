import { setupWorker } from 'msw';
import handlers from './handlers';

/**
 * This allows us to use our mocked API requests which
 * we defined for our integration tests in the browser.
 * This comes in handy when the actual API is down or when a
 * feature has not yet been implemented in the backend.
*/

export default setupWorker(...handlers);
