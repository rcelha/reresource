import { combineReducers } from 'redux';
import { reducer as fetchReducer } from './fetch-reducer';
import { reducer as listReducer } from './list-reducer';

export const reducer = combineReducers({
  byId: fetchReducer,
  list: listReducer,
});
