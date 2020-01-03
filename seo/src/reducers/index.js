import { combineReducers } from 'redux';
import seo from './seo';
import extension from './extension';
import visibility from './visibility';

export default combineReducers({
    seo,
    extension,
    visibility
});
