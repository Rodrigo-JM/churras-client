import { combineReducers } from 'redux';

import session from './session';
import churrasForm from './churrasForm';

export default combineReducers({
  session,
  churrasForm,
});
