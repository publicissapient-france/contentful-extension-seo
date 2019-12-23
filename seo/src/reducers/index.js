import { combineReducers } from 'redux';
import seo from './seo';
import extension from './extension';

export default combineReducers({
    seo,
    extension
});
