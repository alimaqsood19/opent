import axios from 'axios';
import { queryHelpers } from '@testing-library/react';

export const FETCH_RESTAURANT_LIST_SUCCESS = 'FETCH_RESTAURANT_LIST_SUCCESS';
export const FETCH_RESTAURANT_LIST_ERROR = 'FETCH_RESTAURANT_LIST_ERROR';
export const FETCH_RESTAURANT_LIST_LOADING = 'FETCH_RESTAURANT_LIST_LOADING';

const fetchRestaurantListSuccess = (data) => ({
  type: FETCH_RESTAURANT_LIST_SUCCESS,
  payload: data,
});

const fetchRestaurantListError = (error) => ({
  type: FETCH_RESTAURANT_LIST_SUCCESS,
  payload: error,
});

const fetchRestaurantListLoading = () => ({
  type: FETCH_RESTAURANT_LIST_LOADING,
});

export const fetchRestaurantList = (city, price, zip, page) => (
  dispatch,
  getState
) => {
  dispatch(fetchRestaurantListLoading());
  let queryUrl = 'http://opentable.herokuapp.com/api/restaurants';
  let { restaurants } = getState();
  let cityParam = city || restaurants.city;
  let priceParam = price || restaurants.price;
  let zipParam = zip || restaurants.zip;

  console.log(cityParam);
  return axios({
    url: queryUrl,
    params: {
      city: cityParam,
      price: priceParam,
      zip: zipParam,
      page: page,
    },
  })
    .then((data) => {
      dispatch(
        fetchRestaurantListSuccess({
          data: data.data,
          url: queryUrl,
          city: cityParam,
          price: priceParam,
          zip: zipParam,
          page,
        })
      );
    })
    .catch((err) => {
      dispatch(fetchRestaurantListError(err));
    });
};
