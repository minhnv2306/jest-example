/*
 * JestExample Messages
 *
 * This contains all the text for the JestExample container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.JestExample';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the JestExample container!',
  },
});
