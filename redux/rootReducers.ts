import { combineReducers } from 'redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import languageReducer from './slices/languageSlice'


const rootReducer = combineReducers({
  language: languageReducer,

});


export { rootReducer };
