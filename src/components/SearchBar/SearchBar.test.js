import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  FETCH_RESTAURANT_LIST_SUCCESS,
  FETCH_RESTAURANT_LIST_LOADING,
  fetchRestaurantList,
  fetchRestaurantListSuccess,
  fetchRestaurantListLoading,
} from './actions';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  it('should wait and display loading state while async action to fetch restaurants is in progress', () => {
    const expectedAction = {
      type: FETCH_RESTAURANT_LIST_LOADING,
    };
    expect(fetchRestaurantListLoading()).toEqual(expectedAction);
  });

  it('should create an action to store restaurants in reducer', () => {
    const payload = {
      id: 21307,
      name: 'Scaramouche Restaurant',
      address: '1 Benvenuto Place',
      city: 'Toronto',
      state: 'ON',
      area: 'Toronto / SW Ontario',
      postal_code: 'M4V 2L1',
      country: 'CA',
      phone: '4169618011',
      lat: 43.68207,
      lng: -79.40041,
      price: 4,
      reserve_url: 'http://www.opentable.com/single.aspx?rid=21307',
      mobile_reserve_url: 'http://mobile.opentable.com/opentable/?restId=21307',
      image_url: 'https://www.opentable.com/img/restimages/21307.jpg',
    };

    const expectedAction = {
      type: FETCH_RESTAURANT_LIST_SUCCESS,
      payload,
    };
    expect(fetchRestaurantListSuccess(payload)).toEqual(expectedAction);
  });
});

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('creates FETCH_RESTAURANT_LIST_SUCCESS when fetching restaurants has been done', () => {
    fetchMock.getOnce('/api/restaurants', {
      body: {
        total_entries: 321,
        per_page: 25,
        current_page: 1,
        restaurants: [
          {
            id: 21307,
            name: 'Scaramouche Restaurant',
            address: '1 Benvenuto Place',
            city: 'Toronto',
            state: 'ON',
            area: 'Toronto / SW Ontario',
            postal_code: 'M4V 2L1',
            country: 'CA',
            phone: '4169618011',
            lat: 43.68207,
            lng: -79.40041,
            price: 4,
            reserve_url: 'http://www.opentable.com/single.aspx?rid=21307',
            mobile_reserve_url:
              'http://mobile.opentable.com/opentable/?restId=21307',
            image_url: 'https://www.opentable.com/img/restimages/21307.jpg',
          },
        ],
      },
      headers: { 'content-type': 'application/json' },
    });

    const store = mockStore({ restaurants: {} });

    return store.dispatch(fetchRestaurantList('toronto')).then(() => {
      // return of async actions
      expect(store.getActions()).toBeTruthy();
    });
  });
});
