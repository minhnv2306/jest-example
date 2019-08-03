/**
 *
 * Asynchronously loads the component for JestExample
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
