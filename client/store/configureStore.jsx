import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { uploadPresentation } from '../actions/presentationActions';

import rootReducer from '../reducers';
import {
  broadcastMiddleware,
  createRoomMiddleware,
  redirectMiddleware,
  matrixMiddleware
} from '../socketOn.js';


const configureStore = (preloadedState) => {
  const store = createStore(
  	rootReducer,
  	preloadedState,
  	composeWithDevTools(applyMiddleware(
      thunkMiddleware,
      broadcastMiddleware,
      redirectMiddleware,
      createRoomMiddleware,
      matrixMiddleware
    ))
  );

  return store;
};

export default configureStore;
