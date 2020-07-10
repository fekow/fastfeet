import { createStore, compose, applyMiddleware } from 'redux';
// fix this
export default (reducers: any, middlewares: any) => {
  const enhancer = __DEV__
    ? compose(console.tron.createEnhancer(), applyMiddleware(...middlewares))
    : applyMiddleware(...middlewares);

  return createStore(reducers, enhancer);
};
