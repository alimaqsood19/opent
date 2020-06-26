import {
  FETCH_RESTAURANT_LIST_SUCCESS,
  FETCH_RESTAURANT_LIST_ERROR,
  FETCH_RESTAURANT_LIST_LOADING,
} from './actions';

export default (
  state = { restaurants: null, error: null, loading: false },
  action
) => {
  switch (action.type) {
    case FETCH_RESTAURANT_LIST_SUCCESS:
      return {
        ...state,
        restaurants: action.payload.data.restaurants,
        page: action.payload.data.current_page,
        perPage: action.payload.data.per_page,
        totalEntries: action.payload.data.total_entries,
        error: null,
        loading: false,
        url: action.payload.url,
        city: action.payload.city,
        price: action.payload.price,
        zip: action.payload.zip,
      };
    case FETCH_RESTAURANT_LIST_ERROR:
      return {
        ...state,
        restaurants: null,
        error: action.payload,
        loading: false,
      };
    case FETCH_RESTAURANT_LIST_LOADING:
      return {
        ...state,
        restaurants: null,
        error: null,
        loading: true,
      };
    default:
      return state;
  }
};
