/**
 *
 * Tests for JestExample
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { browserHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import { JestExample, mapDispatchToProps } from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';
import configureStore from '../../../configureStore';
import { loadUser } from '../actions';

describe('<JestExample />', () => {
  // it('Expect to not log errors in console', () => {
  //   const spy = jest.spyOn(global.console, 'error');
  //   const dispatch = jest.fn();
  //   render(
  //     <IntlProvider locale={DEFAULT_LOCALE}>
  //       <JestExample dispatch={dispatch} />
  //     </IntlProvider>,
  //   );
  //   expect(spy).not.toHaveBeenCalled();
  // });

  // it('Expect to have additional unit tests specified', () => {
  //   expect(true).toEqual(false);
  // });

  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });
  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <JestExample />
        </IntlProvider>
        ,
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  it('should fetch the repos on mount if a username exists', () => {
    const submitSpy = jest.fn();
    render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <JestExample onClickButton={submitSpy} />
        </IntlProvider>
      </Provider>,
    );
    expect(submitSpy).not.toHaveBeenCalled();
  });

  it('test with user props', () => {
    const submitSpy = jest.fn();
    const user = {
      name: 'MinhNV',
    };
    render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <JestExample user={user} onClickButton={submitSpy} />
        </IntlProvider>
      </Provider>,
    );
    expect(submitSpy).not.toHaveBeenCalled();
  });

  describe('mapDispatchToProps', () => {
    describe('onClickButton', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onClickButton).toBeDefined();
      });

      // 100% Funcs
      it('should dispatch loadUser when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.onClickButton();
        expect(dispatch).toHaveBeenCalledWith(loadUser());
      });
    });
  });
});
