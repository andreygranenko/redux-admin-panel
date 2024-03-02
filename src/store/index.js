import filters from '../reducers/filters';
import heroes from '../reducers/heroes';
import { configureStore} from "@reduxjs/toolkit";

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === 'string') {
    return next({type: action});
  }
  return next(action);
}

const enhancer = (createStore) => (...args) => {
    const store = createStore(...args);

    const oldDispatch = store.dispatch;
    store.dispatch = (action) => {
      if (typeof action === 'string') {
        return oldDispatch({type: action});
      }
      return oldDispatch(action);
    };
    return store;
}

// const store = createStore(
//   combineReducers({heroes, filters}),
//   compose(
//     applyMiddleware(thunk, stringMiddleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
  reducer: {heroes, filters},
  devTools: process.env.NODE_ENV !== 'production'
})

export default store;

//
