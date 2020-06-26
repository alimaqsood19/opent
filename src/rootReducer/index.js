import { combineReducers } from 'redux';
import restaurantListReducer from '../components/SearchBar/reducer';

export default combineReducers({
  restaurants: restaurantListReducer,
});
