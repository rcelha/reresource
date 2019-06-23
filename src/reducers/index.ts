import { combineReducers } from 'redux';
import { reducer as fetchReducer } from './fetch-reducer';
import { reducer as listReducer } from './list-reducer';
import { reducer as createReducer } from './create-reducer';

export const reducer = combineReducers({
  byId: fetchReducer,
  list: listReducer,
  mutation: createReducer,
});
