/**
 *
 * JestExample
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectJestExample, { makeSelectUser } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loadUser } from './actions';

export function JestExample({ user, onClickButton }) {
  useInjectReducer({ key: 'jestExample', reducer });
  useInjectSaga({ key: 'jestExample', saga });

  return (
    <div>
      <Helmet>
        <title>JestExample</title>
        <meta name="description" content="Description of JestExample" />
      </Helmet>
      <FormattedMessage {...messages.header} />
      <h1> Hello I am Minh </h1>
      <button type="button" onClick={onClickButton}>
        Click me
      </button>
      {user && user.userId !== undefined && <h1> {user.title} </h1>}
    </div>
  );
}

JestExample.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onClickButton: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  jestExample: makeSelectJestExample(),
  user: makeSelectUser(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onClickButton: () => {
      dispatch(loadUser());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(JestExample);
