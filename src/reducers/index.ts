import { combineReducers } from 'redux';
import { reducer as byId } from './fetch-reducer';
import { reducer as list } from './list-reducer';
import { reducer as query } from './query-reducer';
import { reducer as mutation } from './create-reducer';

export const reducer = combineReducers({
  byId,
  list,
  query,
  mutation,
});
