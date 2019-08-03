# Luông dữ liệu cho ứng dụng traning sử dụng react-boilerplate

## 1. Tạo container

Khi muốn tạo 1 component mới để thực hiện chức năng, bạn có thể thực hiện bằng cách dùng lệnh

```
npm run generate container
```

(Nó sẽ tạo đủ các thư mục redux, saga, constant, selector, action và kết nối saga cho bạn).

Đăng ký Component này trong router để hoạt động nào

```
/* containers/App/index.js */

...
<Switch>
  <Route exact path="/" component={HomePage} />
  <Route path="/features" component={FeaturePage} />
  <Route path="/jest" component={JestExample} />
<Route path="" component={NotFoundPage} />
</Switch>
// Đặt trước not found nhé
```

## 2. Props

Khi xử lý các sự kiện (như click button, bắt sự kiện thay đổi 1 field nào đó) để bắn ra các action tới saga, reducer, bạn cần sử dụng nó như các `props` để `dispatch` được sự kiện (trong ví dụ là click button)

Đăng kí nó vào đầu vào component

```
export function JestExample({ user, onClickButton }) {
  ...
  <button onClick={onClickButton}> Click me </button>
}
```

và đăng ký `mapDispatchToProps` để dispatch sự kiện

```
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onClickButton: evt => {
      dispatch(loadUser());
    },
  };
}
```

Chỗ này bạn có thể tùy chọn bắn action có qua saga hay không (saga là middleware, nếu cần call API hay làm 1 việc gì đó như truyền thêm dữ liệu thì hãy dùng saga) nếu không có thể truyền thẳng tới reducer.

Quyết định có qua saga hay không chính là do type của action loadUser bạn truyền vào (có `type` đã được đăng ký ở saga hay không?)
Action có dạng

```
export function loadUser() {
  return {
    type: 'LOAD_USER_SAGA', // type không đăng ký trong saga thì chuyển tới reducer
  };
}
```

## 3. Xử lý saga (tùy chọn)

Nếu action của bạn có chuyển qua saga, chúng ta sẽ mở file saga để xử lý.
Bạn cần đăng ký saga và call API, sau đó truyền action mới tới reducer thôi, khá đơn giản:

```
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_REPOS } from 'containers/App/constants';
import { loadedUser } from 'containers/JestExample/actions';

import request from 'utils/request';
import { makeSelectUsername } from 'containers/HomePage/selectors';

/**
 * Github repos request/response handler
 */
export function* loadUser() {
  const requestURL = `https://jsonplaceholder.typicode.com/todos/1`;

  try {
    // Call our request helper (see 'utils/request')

  /* Step 1: Call API to get data */
    const user = yield call(request, requestURL);
    console.log('Hello Saga');

  /* Step 2: Put received data to reducer with put method
  Note: action the same the action in saga (include type and data)
  */
    yield put(loadedUser(user));
  } catch (err) {
    console.log(err);
    // yield put(repoLoadingError(err));
    console.log(1);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loadUserFromFakeAPI() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest('LOAD_USER_SAGA', loadUser);
}
```

## 4. Reducer

Sau khi bên view phát action, reducer sẽ đón nhận và xử lý. Trong reducer sẽ có

- initState: state mặc định trong store
- Hàm xử lý action:

initState ======> (dữ liệu từ người dùng truyền xuống hoặc lấy được từ saga) ====> newState trả ngược về view

## 5. Render state mới ra view

Sau khi đã có state mới trả về từ reducer. công việc cuối cùng là render state mới ra view.

Ta sẽ ánh xạ state này thành props của Component để hiển thị. Nó sẽ được thực hiện qua hàm mapStateToProps trong Component.

Chúng ta sẽ sử dụng selector để thực hiện việc ánh xạ này:

```
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the jestExample state domain
 */

const selectJestExampleDomain = state => state.jestExample || initialState;

/**
 * Other specific selectors
 */

const makeSelectUser = () =>
  createSelector(
    selectJestExampleDomain,
    jestState => jestState.user,
  );
export default makeSelectJestExample;
export { makeSelectUser };
```

File index.js

```
const mapStateToProps = createStructuredSelector({
  jestExample: makeSelectJestExample(),
  user: makeSelectUser(),
});
```

OK thế là state user được chuyển thành props với tên user trong Component rồi đó.

# Tóm lại luồng dữ liệu sẽ như sau

`View`: dispatch action (dưới dạng props và được đăng kí trong mapDispatchToProps) ======> `Saga` (tùy chọn): nhận action từ view, call API và bắn 1 action mới tới reducer qua phương thức put ====> `Reducer`: xử lý với mỗi action và dữ liệu qua switch/case, trả về new State từ initState ======> `View`: nhận newState, map nó thành props và render ra view (mapStateToProps)

Action sẽ có dạng

```
{
  type: 'ABC',
  // data
  user: {
    name: 'MinhNV',
    age: '100',
  }
}
```
