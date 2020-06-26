import React from 'react';
import { connect } from 'react-redux';
import { fetchRestaurantList } from '../SearchBar/actions';
import './style.css';

class Pagination extends React.Component {
  handleClick = (page) => {
    this.props.restaurantList(null, null, null, page);
  };
  render() {
    const { totalEntries, perPage, page, restaurantList } = this.props;
    if (!totalEntries || !restaurantList) {
      return '';
    }

    const pagesTotal = Math.ceil(totalEntries / perPage);
    const pagination = Array.from({ length: pagesTotal }, (v, k) => k + 1);
    return (
      <div className="pagination">
        {pagination.map((num) => {
          return (
            <div
              className="paginationBlock"
              onClick={() => this.handleClick(num)}
              key={num}
              style={{ backgroundColor: num === page && 'gray' }}
            >
              {num}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.restaurants.page,
    perPage: state.restaurants.perPage,
    totalEntries: state.restaurants.totalEntries,
    restaurantList: state.restaurants.restaurants,
  };
};
const mapDispatchToProps = (dispatch) => ({
  restaurantList: (city, refine, price, postal) =>
    dispatch(fetchRestaurantList(city, refine, price, postal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
